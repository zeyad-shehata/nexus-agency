import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().email('Invalid email address').max(255),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password too long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  phone: z.string().max(20).optional()
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address').max(255),
  password: z.string().min(1, 'Password is required').max(128),
  rememberMe: z.boolean().optional()
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address').max(255)
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password too long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
});

export const projectSubmitSchema = z.object({
  title: z.string().min(3, 'Project title must be at least 3 characters').max(200),
  description: z.string().min(10, 'Project description must be at least 10 characters').max(5000),
  industry: z.string().max(100).optional(),
  budget: z.string().min(1, 'Budget is required').max(100),
  timeline: z.string().min(1, 'Timeline is required').max(100),
  preferredColors: z.string().max(200).optional(),
  references: z.string().max(2000).optional()
});

export const contactRequestSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').max(255),
  phone: z.string().max(20).optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000)
});

export const reviewSubmitSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(5, 'Review comment must be at least 5 characters').max(2000)
});

export const portfolioSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(5000),
  coverImage: z.string().url('Cover image must be a valid URL').max(500),
  gallery: z.array(z.string().url().max(500)).optional().default([]),
  technologies: z.array(z.string().max(50)).min(1, 'At least one tech badge is required'),
  category: z.string().min(2).max(100)
});

export const serviceSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(5000),
  startingPrice: z.number().positive(),
  icon: z.string().min(1).max(50)
});

export const blogSchema = z.object({
  title: z.string().min(5).max(200),
  content: z.string().min(20).max(50000),
  coverImage: z.string().url().max(500),
  published: z.boolean().optional().default(false)
});

export const chatMessageSchema = z.object({
  conversationId: z.string().uuid(),
  message: z.string().max(5000).optional(),
  content: z.string().max(5000).optional(),
  attachment: z.string().max(500).optional(),
  attachmentUrl: z.string().max(500).optional()
}).refine(
  (data) => !!(data.message || data.content || data.attachment || data.attachmentUrl),
  { message: 'Message must contain text content or an attachment.' }
);
