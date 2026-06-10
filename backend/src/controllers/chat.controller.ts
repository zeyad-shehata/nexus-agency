import { Response, NextFunction } from 'express';
import prisma from '../config/db';
import { chatMessageSchema } from '../utils/validation';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { emitToConversation, emitToUser } from '../services/socket.service';
import { Role } from '@prisma/client';

// 1. Get or Create Chat Conversation for a Project
export async function getOrCreateConversation(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

    const { projectId } = req.body;
    
    // Find first admin
    const firstAdmin = await prisma.user.findFirst({
      where: { role: Role.ADMIN }
    });

    if (!firstAdmin) {
      return res.status(500).json({ error: 'No support admins available.' });
    }

    let conversation;
    if (projectId) {
      // Find the project first
      const project = await prisma.project.findUnique({
        where: { id: projectId }
      });

      if (!project) {
        return res.status(404).json({ error: 'Project not found.' });
      }

      conversation = await prisma.chatConversation.findFirst({
        where: {
          clientId: req.user.id,
          adminId: firstAdmin.id,
          projectId: project.id
        }
      });

      if (!conversation) {
        conversation = await prisma.chatConversation.create({
          data: {
            projectId: project.id,
            clientId: req.user.id,
            adminId: firstAdmin.id
          }
        });
      }
    } else {
      // General support conversation (no projectId)
      conversation = await prisma.chatConversation.findFirst({
        where: {
          clientId: req.user.id,
          adminId: firstAdmin.id,
          projectId: null
        }
      });

      if (!conversation) {
        conversation = await prisma.chatConversation.create({
          data: {
            clientId: req.user.id,
            adminId: firstAdmin.id,
            projectId: null
          }
        });
      }
    }

    return res.json(conversation);
  } catch (error) {
    next(error);
  }
}

// 2. Get Conversations list
export async function getConversations(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

    let conversations = [];

    if (req.user.role === Role.ADMIN) {
      // Admins see all conversations
      conversations = await prisma.chatConversation.findMany({
        include: {
          client: { select: { id: true, name: true, email: true, avatar: true } },
          project: { select: { id: true, title: true, status: true } },
          messages: {
            orderBy: { createdAt: 'desc' },
            take: 1
          }
        },
        orderBy: { updatedAt: 'desc' }
      });
    } else {
      // Clients see their own conversations
      conversations = await prisma.chatConversation.findMany({
        where: { clientId: req.user.id },
        include: {
          admin: { select: { id: true, name: true, email: true, avatar: true } },
          project: { select: { id: true, title: true, status: true } },
          messages: {
            orderBy: { createdAt: 'desc' },
            take: 1
          }
        },
        orderBy: { updatedAt: 'desc' }
      });
    }

    // Batch unread count query — single query instead of N+1
    const conversationIds = conversations.map(c => c.id);
    const unreadCounts = await prisma.chatMessage.groupBy({
      by: ['conversationId'],
      where: {
        conversationId: { in: conversationIds },
        senderId: { not: req.user!.id },
        seen: false
      },
      _count: { id: true }
    });

    const unreadMap = new Map(unreadCounts.map(u => [u.conversationId, u._count.id]));

    const conversationsWithUnread = conversations.map(c => ({
      ...c,
      unreadCount: unreadMap.get(c.id) || 0
    }));

    return res.json(conversationsWithUnread);
  } catch (error) {
    next(error);
  }
}

// 3. Get Messages in a Conversation & mark as Seen (Read receipts)
export async function getMessages(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

    const { conversationId } = req.params;

    const conversation = await prisma.chatConversation.findUnique({
      where: { id: conversationId }
    });

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found.' });
    }

    // Auth check: Admin or client participating
    if (req.user.role !== Role.ADMIN && conversation.clientId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied.' });
    }

    // Mark messages from opposite party as seen
    await prisma.chatMessage.updateMany({
      where: {
        conversationId,
        senderId: { not: req.user.id },
        seen: false
      },
      data: { seen: true }
    });

    const messages = await prisma.chatMessage.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' }
    });

    // Notify other user about read receipt
    const otherUserId = req.user.role === Role.ADMIN ? conversation.clientId : conversation.adminId;
    emitToUser(otherUserId, 'messages_read', { conversationId });

    return res.json(messages);
  } catch (error) {
    next(error);
  }
}

// 4. Send Message (Save & Broadcast)
export async function sendMessageController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

    const parsed = chatMessageSchema.parse(req.body);
    const { conversationId } = parsed;
    const messageContent = parsed.content || parsed.message || '';
    const attachmentUrl = parsed.attachmentUrl || parsed.attachment || null;

    const conversation = await prisma.chatConversation.findUnique({
      where: { id: conversationId },
      include: { client: true, admin: true }
    });

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found.' });
    }

    const recipientId = req.user.role === Role.ADMIN ? conversation.clientId : conversation.adminId;

    // Create message
    const chatMessage = await prisma.chatMessage.create({
      data: {
        conversationId,
        senderId: req.user.id,
        receiverId: recipientId,
        senderRole: req.user.role,
        content: messageContent,
        message: messageContent, // backward compatibility
        attachment: attachmentUrl, // backward compatibility
        attachmentUrl: attachmentUrl,
        seen: false,
        delivered: true
      }
    });

    // Update conversation updatedAt timestamp
    await prisma.chatConversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() }
    });

    // Broadcast message to room
    emitToConversation(conversationId, 'message_received', chatMessage);

    // Send notifications to recipient
    await prisma.notification.create({
      data: {
        userId: recipientId,
        title: 'New Support Message',
        body: `You received a message from ${req.user.role === Role.ADMIN ? 'Support' : 'Client'}: "${messageContent.slice(0, 50)}"`
      }
    });

    emitToUser(recipientId, 'notification_received', {
      title: 'New Support Message',
      body: `You received a message: "${messageContent.slice(0, 50)}"`,
      conversationId
    });

    return res.status(201).json(chatMessage);
  } catch (error) {
    next(error);
  }
}
