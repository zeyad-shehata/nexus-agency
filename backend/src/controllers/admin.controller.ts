import { Response, NextFunction } from 'express';
import prisma from '../config/db';
import { Role, ProjectStatus, ContactStatus } from '@prisma/client';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

// 1. Dashboard Analytics
export async function getDashboardAnalytics(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    // Total Clients (Role.USER — there is no CLIENT role in schema)
    const totalClients = await prisma.user.count({
      where: { role: Role.USER }
    });

    // Active Projects (exclude Pending, Completed, Cancelled)
    const activeProjects = await prisma.project.count({
      where: {
        status: {
          in: [
            ProjectStatus.Under_Review,
            ProjectStatus.Planning,
            ProjectStatus.Designing,
            ProjectStatus.Development,
            ProjectStatus.Testing
          ]
        }
      }
    });

    // Pending Proposals
    const pendingProjects = await prisma.project.count({
      where: { status: ProjectStatus.Pending }
    });

    // Contact Requests count
    const pendingContactRequests = await prisma.contactRequest.count({
      where: { status: ContactStatus.New }
    });

    // Total Projects
    const totalProjects = await prisma.project.count();

    // Mock Revenue estimation based on budgets of completed/active projects
    const projectsWithBudgets = await prisma.project.findMany({
      select: { budget: true, status: true }
    });

    let estimatedRevenue = 0;
    projectsWithBudgets.forEach(p => {
      // Budgets are strings like "$5,000 — $10,000" or "$3,000", let's extract the first numeric bounds
      const match = p.budget.replace(/[^0-9]/g, '');
      const val = parseInt(match.slice(0, 5)) || 5000; 
      if (p.status === ProjectStatus.Completed) {
        estimatedRevenue += val;
      } else if (p.status !== ProjectStatus.Cancelled) {
        estimatedRevenue += val * 0.4; // 40% initial milestone deposit revenue
      }
    });

    return res.json({
      analytics: {
        totalClients,
        activeProjects,
        pendingProjects,
        pendingContactRequests,
        totalProjects,
        estimatedRevenue: `$${estimatedRevenue.toLocaleString()}`
      }
    });
  } catch (error) {
    next(error);
  }
}

// 2. Manage Users
export async function getUsers(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        emailVerified: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });
    return res.json({ users });
  } catch (error) {
    next(error);
  }
}

// 3. Activity Logs
export async function getActivityLogs(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const logs = await prisma.activityLog.findMany({
      include: {
        user: { select: { name: true, email: true, role: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: 100 // Cap at last 100 entries for stability
    });
    return res.json({ logs });
  } catch (error) {
    next(error);
  }
}
