import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';
import prisma from '../config/db';
import { logger } from '../utils/logger';
import { env } from '../config/env';

let io: Server | null = null;
const userSockets = new Map<string, string[]>(); // Map of userId -> socketIds

const ACCESS_SECRET = env.JWT_ACCESS_SECRET;

// Build allowed origins from env
function getAllowedOrigins(): string[] {
  if (env.FRONTEND_URL) {
    return [env.FRONTEND_URL];
  }
  return ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'];
}

export function initSocket(server: any) {
  io = new Server(server, {
    cors: {
      origin: getAllowedOrigins(),
      methods: ['GET', 'POST'],
      credentials: true
    },
    pingTimeout: 60000,
    pingInterval: 25000
  });

  // Socket middleware for JWT verification
  io.use((socket: Socket, next) => {
    const token = socket.handshake.auth.token || socket.handshake.query.token;
    
    if (!token) {
      return next(new Error('Authentication error: Token missing.'));
    }

    try {
      const decoded = jwt.verify(token as string, ACCESS_SECRET) as {
        id: string;
        email: string;
        role: Role;
      };
      socket.data = {
        userId: decoded.id,
        role: decoded.role,
        email: decoded.email
      };
      next();
    } catch (err) {
      return next(new Error('Authentication error: Token invalid.'));
    }
  });

  io.on('connection', (socket: Socket) => {
    const { userId, role, email } = socket.data;
    
    // Register socket connection
    const currentSockets = userSockets.get(userId) || [];
    currentSockets.push(socket.id);
    userSockets.set(userId, currentSockets);

    logger.info(`🔌 User connected: ${email} (Socket: ${socket.id}, Role: ${role})`);

    // Broadcast updated online users
    const getOnlineUsers = () => Array.from(userSockets.keys());
    io!.emit('online_users', getOnlineUsers());

    // Let clients join rooms based on conversationIds (handles both string and object payloads)
    socket.on('join_conversation', (data: any) => {
      const conversationId = typeof data === 'string' ? data : data?.conversationId;
      if (conversationId) {
        socket.join(conversationId);
        logger.info(`💬 Socket ${socket.id} joined conversation: ${conversationId}`);
      }
    });

    // Handle user typing state broadcasts (emits user_typing and typing_received to ensure compatibility)
    socket.on('typing_state', (data: { conversationId: string; typing: boolean }) => {
      socket.to(data.conversationId).emit('user_typing', {
        conversationId: data.conversationId,
        typing: data.typing,
        userId
      });
      socket.to(data.conversationId).emit('typing_received', {
        conversationId: data.conversationId,
        typing: data.typing,
        userId
      });
    });

    // Handle message read receipts
    socket.on('message_read', async (data: { conversationId: string; messageId?: string }) => {
      try {
        if (data.messageId) {
          await prisma.chatMessage.update({
            where: { id: data.messageId },
            data: { seen: true }
          });
        } else {
          await prisma.chatMessage.updateMany({
            where: {
              conversationId: data.conversationId,
              senderId: { not: userId },
              seen: false
            },
            data: { seen: true }
          });
        }
        io!.to(data.conversationId).emit('message_read_receipt', {
          conversationId: data.conversationId,
          messageId: data.messageId || null,
          userId
        });
      } catch (err) {
        logger.error('Failed to update message read receipt:', err);
      }
    });

    // Handle socket disconnect
    socket.on('disconnect', () => {
      const currentSockets = userSockets.get(userId) || [];
      const updatedSockets = currentSockets.filter(id => id !== socket.id);
      
      if (updatedSockets.length > 0) {
        userSockets.set(userId, updatedSockets);
      } else {
        userSockets.delete(userId);
      }
      logger.info(`🔌 User disconnected: ${email} (Socket: ${socket.id})`);
      
      // Broadcast updated online users
      io!.emit('online_users', getOnlineUsers());
    });
  });

  return io;
}

// Helper: Emit real-time event to a specific user
export function emitToUser(userId: string, event: string, data: any) {
  if (!io) return;
  const socketIds = userSockets.get(userId);
  if (socketIds && socketIds.length > 0) {
    socketIds.forEach(socketId => {
      io!.to(socketId).emit(event, data);
    });
  }
}

// Helper: Emit real-time event to all connected admins
export async function emitToAdmins(event: string, data: any) {
  if (!io) return;
  
  // Find all active socket IDs matching admins
  for (const [userId, socketIds] of userSockets.entries()) {
    // Look up socket rooms or meta properties
    socketIds.forEach(socketId => {
      const sock = io!.sockets.sockets.get(socketId);
      if (sock && sock.data.role === Role.ADMIN) {
        io!.to(socketId).emit(event, data);
      }
    });
  }
}

// Helper: Broadcast inside a conversation room
export function emitToConversation(conversationId: string, event: string, data: any) {
  if (!io) return;
  io.to(conversationId).emit(event, data);
}
