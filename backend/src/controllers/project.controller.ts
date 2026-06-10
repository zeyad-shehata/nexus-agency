import { Response, NextFunction } from 'express';
import { ProjectStatus, Role } from '@prisma/client';
import prisma from '../config/db';
import { projectSubmitSchema } from '../utils/validation';
import { generateProjectSummary } from '../services/ai.service';
import { sendProjectSubmissionEmail, sendProjectStatusUpdateEmail } from '../services/email.service';
import { logger } from '../utils/logger';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { emitToUser, emitToAdmins } from '../services/socket.service';

// 1. Submit/Create Project Brief
export async function createProject(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

    const validatedData = projectSubmitSchema.parse(req.body);
    
    // Generate AI project summary using Gemini (or fallback)
    const aiSummary = await generateProjectSummary(validatedData.description);

    const firstAdmin = await prisma.user.findFirst({
      where: { role: Role.ADMIN }
    });

    // Create Project elements transactionally
    const project = await prisma.$transaction(async (tx) => {
      const proj = await tx.project.create({
        data: {
          clientId: req.user!.id,
          title: validatedData.title,
          description: validatedData.description,
          industry: validatedData.industry,
          budget: validatedData.budget,
          timeline: validatedData.timeline,
          preferredColors: validatedData.preferredColors,
          references: validatedData.references,
          aiSummary,
          status: ProjectStatus.Pending
        }
      });

      // Bulk insert attached files
      if (req.body.files && Array.isArray(req.body.files) && req.body.files.length > 0) {
        await tx.projectFile.createMany({
          data: req.body.files.map((f: any) => ({
            projectId: proj.id,
            filename: f.filename,
            url: f.url,
            size: String(f.size)
          }))
        });
      }

      // Auto-create Chat Conversation between client and admin
      if (firstAdmin) {
        await tx.chatConversation.create({
          data: {
            projectId: proj.id,
            clientId: req.user!.id,
            adminId: firstAdmin.id
          }
        });
      }

      // Notify Client
      await tx.notification.create({
        data: {
          userId: req.user!.id,
          title: 'Project Brief Submitted',
          body: `Your project "${proj.title}" has been successfully submitted and is under review.`
        }
      });

      // Notify Admin
      if (firstAdmin) {
        await tx.notification.create({
          data: {
            userId: firstAdmin.id,
            title: 'New Project Proposal',
            body: `Client ${req.user!.email} submitted a new brief: "${proj.title}"`
          }
        });
      }

      return proj;
    });

    // Real-time socket alerts (outside transaction)
    if (firstAdmin) {
      emitToUser(firstAdmin.id, 'notification_received', {
        title: 'New Project Proposal',
        body: `Client ${req.user.email} submitted a new brief: "${project.title}"`
      });
    }

    // Send emails (outside transaction)
    await sendProjectSubmissionEmail(req.user.email, req.user.email.split('@')[0], project.title);
    
    // Log Activity (outside transaction)
    await logger.activity(req.user.id, 'PROJECT_CREATE', `Submitted project: ${project.title} (ID: ${project.id})`);

    return res.status(201).json({
      message: 'Project brief submitted successfully',
      project
    });
  } catch (error) {
    next(error);
  }
}

// 2. Get All Projects (with Client vs Admin logic + filtering)
export async function getProjects(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

    let projects = [];

    if (req.user.role === Role.ADMIN) {
      // Admin can search, filter, and view all projects
      const { search, status } = req.query;
      
      const filter: any = {};
      if (status) {
        filter.status = status as ProjectStatus;
      }
      if (search) {
        filter.OR = [
          { title: { contains: search as string, mode: 'insensitive' } },
          { description: { contains: search as string, mode: 'insensitive' } }
        ];
      }

      projects = await prisma.project.findMany({
        where: filter,
        include: {
          client: { select: { id: true, name: true, email: true } },
          files: true
        },
        orderBy: { createdAt: 'desc' }
      });
    } else {
      // Client can only view their own projects
      projects = await prisma.project.findMany({
        where: { clientId: req.user.id },
        include: { files: true },
        orderBy: { createdAt: 'desc' }
      });
    }

    return res.json({ projects });
  } catch (error) {
    next(error);
  }
}

// 3. Get Single Project details
export async function getProjectById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      include: {
        client: { select: { id: true, name: true, email: true, phone: true } },
        files: true
      }
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    // Authorization check: Admin or the owner Client
    if (req.user.role !== Role.ADMIN && project.clientId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied.' });
    }

    return res.json({ project });
  } catch (error) {
    next(error);
  }
}

// 4. Update Project Status (Admin Only)
export async function updateProjectStatus(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

    const { status } = req.body;
    if (!status || !Object.values(ProjectStatus).includes(status)) {
      return res.status(400).json({ error: 'Invalid project status value.' });
    }

    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      include: { client: true }
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    // Update project status
    const updatedProject = await prisma.project.update({
      where: { id: req.params.id },
      data: { status: status as ProjectStatus }
    });

    // Create Notification for Client
    await prisma.notification.create({
      data: {
        userId: project.clientId,
        title: 'Project Status Updated',
        body: `The status of your project "${project.title}" has changed to: ${status}.`
      }
    });

    // Emit Real-time notification to client
    emitToUser(project.clientId, 'notification_received', {
      title: 'Project Status Updated',
      body: `The status of your project "${project.title}" has changed to: ${status}.`
    });

    // Send status update email
    await sendProjectStatusUpdateEmail(project.client.email, project.client.name, project.title, status);

    // Log Activity
    await logger.activity(req.user.id, 'PROJECT_STATUS_UPDATE', `Updated status of ${project.title} to ${status}`);

    return res.json({
      message: 'Project status updated successfully',
      project: updatedProject
    });
  } catch (error) {
    next(error);
  }
}

// 5. Delete Project (Admin Only)
export async function deleteProject(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

    const project = await prisma.project.findUnique({ where: { id: req.params.id } });
    if (!project) return res.status(404).json({ error: 'Project not found.' });

    await prisma.project.delete({ where: { id: req.params.id } });

    await logger.activity(req.user.id, 'PROJECT_DELETE', `Deleted project: ${project.title} (ID: ${project.id})`);

    return res.json({ message: 'Project deleted successfully.' });
  } catch (error) {
    next(error);
  }
}
