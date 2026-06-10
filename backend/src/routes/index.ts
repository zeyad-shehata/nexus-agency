import { Router } from 'express';
import { 
  register, 
  login, 
  logout, 
  refresh, 
  me, 
  forgotPassword, 
  resetPassword,
  verifyEmail,
  changePassword
} from '../controllers/auth.controller';
import { 
  createProject, 
  getProjects, 
  getProjectById, 
  updateProjectStatus, 
  deleteProject 
} from '../controllers/project.controller';
import { 
  getOrCreateConversation, 
  getConversations, 
  getMessages, 
  sendMessageController 
} from '../controllers/chat.controller';
import { 
  getDashboardAnalytics, 
  getUsers, 
  getActivityLogs 
} from '../controllers/admin.controller';
import {
  getServices, createService, updateService, deleteService,
  getPortfolio, createPortfolio, updatePortfolio, deletePortfolio,
  getBlogs, createBlog, updateBlog, deleteBlog,
  getReviews, createReview, approveReview, deleteReview,
  createContactRequest, getContactRequests,
  getNotifications, markNotificationsAsRead
} from '../controllers/extra.controller';
import { requireAuth, requireAdmin, requireUser } from '../middleware/auth.middleware';
import { rateLimiter } from '../middleware/rate-limiter.middleware';
import { Role } from '@prisma/client';

const router = Router();

const authRateLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Max 10 attempts per window
  message: 'Too many authentication attempts. Please try again in 15 minutes.'
});

// ============================================
// AUTHENTICATION
// ============================================
router.post('/auth/register', authRateLimiter, register);
router.post('/auth/login', authRateLimiter, login);
router.post('/auth/logout', logout);
router.post('/auth/refresh', refresh);
router.post('/auth/forgot-password', forgotPassword);
router.post('/auth/reset-password', resetPassword);
router.get('/auth/me', requireAuth, me);
router.get('/auth/verify-email', verifyEmail);
router.post('/auth/change-password', requireAuth, changePassword);

// ============================================
// PROJECTS
// ============================================
router.post('/projects', requireAuth, createProject);
router.get('/projects', requireAuth, getProjects);
router.get('/projects/:id', requireAuth, getProjectById);
router.patch('/projects/:id', requireAuth, requireAdmin, updateProjectStatus);
router.delete('/projects/:id', requireAuth, requireAdmin, deleteProject);

// ============================================
// CHAT
// ============================================
router.post('/chat/conversation', requireAuth, getOrCreateConversation);
router.get('/chat/conversations', requireAuth, getConversations);
router.get('/chat/:conversationId', requireAuth, getMessages);
router.post('/chat/send', requireAuth, sendMessageController);

// ============================================
// NOTIFICATIONS
// ============================================
router.get('/notifications', requireAuth, getNotifications);
router.patch('/notifications/read', requireAuth, markNotificationsAsRead);

// ============================================
// REVIEWS
// ============================================
router.get('/reviews', getReviews); // Public access
router.post('/reviews', requireAuth, createReview);
router.patch('/reviews/:id', requireAuth, requireAdmin, approveReview);
router.delete('/reviews/:id', requireAuth, requireAdmin, deleteReview);

// ============================================
// PORTFOLIO
// ============================================
router.get('/portfolio', getPortfolio); // Public access
router.post('/portfolio', requireAuth, requireAdmin, createPortfolio);
router.patch('/portfolio/:id', requireAuth, requireAdmin, updatePortfolio);
router.delete('/portfolio/:id', requireAuth, requireAdmin, deletePortfolio);

// ============================================
// SERVICES
// ============================================
router.get('/services', getServices); // Public access
router.post('/services', requireAuth, requireAdmin, createService);
router.patch('/services/:id', requireAuth, requireAdmin, updateService);
router.delete('/services/:id', requireAuth, requireAdmin, deleteService);

// ============================================
// BLOG
// ============================================
router.get('/blog', getBlogs); // Public access
router.post('/blog', requireAuth, requireAdmin, createBlog);
router.patch('/blog/:id', requireAuth, requireAdmin, updateBlog);
router.delete('/blog/:id', requireAuth, requireAdmin, deleteBlog);

// ============================================
// CONTACT REQUESTS
// ============================================
router.post('/contact', createContactRequest); // Public access
router.get('/contact', requireAuth, requireAdmin, getContactRequests);

// ============================================
// ADMIN CONSOLE UTILS
// ============================================
router.get('/admin/analytics', requireAuth, requireAdmin, getDashboardAnalytics);
router.get('/admin/users', requireAuth, requireAdmin, getUsers);
router.get('/admin/logs', requireAuth, requireAdmin, getActivityLogs);

export default router;
