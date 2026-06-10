export type Role = 'USER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  avatar?: string;
  emailVerified: boolean;
}

export interface ProjectFile {
  id: string;
  filename: string;
  url: string;
  projectId: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  budget: string;
  timeline: string;
  clientId: string;
  client?: User;
  files?: ProjectFile[];
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId?: string;
  message?: string;
  content?: string;
  attachmentUrl?: string;
  seen: boolean;
  createdAt: string;
}

export interface ChatConversation {
  id: string;
  projectId: string;
  clientId: string;
  client?: User;
  unreadCount?: number;
}

export interface AnalyticsData {
  activeProjects: number;
  pendingProjects: number;
  totalClients: number;
  pendingContactRequests: number;
  totalProjects: number;
  estimatedRevenue: string;
}
