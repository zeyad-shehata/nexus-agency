import { Response, NextFunction } from 'express';
import prisma from '../config/db';
import { ContactStatus } from '@prisma/client';
import { 
  contactRequestSchema, 
  reviewSubmitSchema, 
  portfolioSchema, 
  serviceSchema, 
  blogSchema 
} from '../utils/validation';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

// ============================================
// 1. SERVICES
// ============================================
export async function getServices(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const services = await prisma.service.findMany({ orderBy: { startingPrice: 'asc' } });
    return res.json({ services });
  } catch (error) { next(error); }
}

export async function createService(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const data = serviceSchema.parse(req.body);
    const service = await prisma.service.create({ data });
    return res.status(201).json({ service });
  } catch (error) { next(error); }
}

export async function updateService(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const data = serviceSchema.partial().parse(req.body);
    const service = await prisma.service.update({
      where: { id: req.params.id },
      data
    });
    return res.json({ service });
  } catch (error) { next(error); }
}

export async function deleteService(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    await prisma.service.delete({ where: { id: req.params.id } });
    return res.json({ message: 'Service deleted.' });
  } catch (error) { next(error); }
}

// ============================================
// 2. PORTFOLIO
// ============================================
export async function getPortfolio(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const portfolio = await prisma.portfolio.findMany();
    return res.json({ portfolio });
  } catch (error) { next(error); }
}

export async function createPortfolio(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const data = portfolioSchema.parse(req.body);
    const portfolio = await prisma.portfolio.create({ data });
    return res.status(201).json({ portfolio });
  } catch (error) { next(error); }
}

export async function updatePortfolio(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const data = portfolioSchema.partial().parse(req.body);
    const portfolio = await prisma.portfolio.update({
      where: { id: req.params.id },
      data
    });
    return res.json({ portfolio });
  } catch (error) { next(error); }
}

export async function deletePortfolio(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    await prisma.portfolio.delete({ where: { id: req.params.id } });
    return res.json({ message: 'Portfolio item deleted.' });
  } catch (error) { next(error); }
}

// ============================================
// 3. BLOG
// ============================================
export async function getBlogs(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.json({ blogs });
  } catch (error) { next(error); }
}

export async function createBlog(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const data = blogSchema.parse(req.body);
    const baseSlug = data.title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    // Append short hash to prevent unique constraint collisions
    const slugSuffix = Date.now().toString(36).slice(-4);
    const slug = `${baseSlug}-${slugSuffix}`;
    const blog = await prisma.blog.create({
      data: { ...data, slug }
    });
    return res.status(201).json({ blog });
  } catch (error) { next(error); }
}

export async function updateBlog(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const data = blogSchema.partial().parse(req.body);
    const updateData: any = { ...data };
    if (data.title) {
      updateData.slug = data.title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-');
    }
    const blog = await prisma.blog.update({
      where: { id: req.params.id },
      data: updateData
    });
    return res.json({ blog });
  } catch (error) { next(error); }
}

export async function deleteBlog(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    await prisma.blog.delete({ where: { id: req.params.id } });
    return res.json({ message: 'Blog post deleted.' });
  } catch (error) { next(error); }
}

// ============================================
// 4. REVIEWS
// ============================================
export async function getReviews(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    // Admins see all; users see only approved ones
    const filter = req.user?.role === 'ADMIN' ? {} : { approved: true };
    const reviews = await prisma.review.findMany({
      where: filter,
      include: {
        user: { select: { name: true, avatar: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    return res.json({ reviews });
  } catch (error) { next(error); }
}

export async function createReview(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const data = reviewSubmitSchema.parse(req.body);
    const review = await prisma.review.create({
      data: {
        userId: req.user.id,
        rating: data.rating,
        comment: data.comment,
        approved: false // Requires admin moderation
      }
    });
    return res.status(201).json({ review });
  } catch (error) { next(error); }
}

export async function approveReview(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { approved } = req.body;
    const review = await prisma.review.update({
      where: { id: req.params.id },
      data: { approved: !!approved }
    });
    return res.json({ review });
  } catch (error) { next(error); }
}

export async function deleteReview(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    await prisma.review.delete({ where: { id: req.params.id } });
    return res.json({ message: 'Review deleted.' });
  } catch (error) { next(error); }
}

// ============================================
// 5. CONTACT
// ============================================
export async function createContactRequest(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const data = contactRequestSchema.parse(req.body);
    const request = await prisma.contactRequest.create({ data });
    return res.status(201).json({ message: 'Contact request submitted successfully.', request });
  } catch (error) { next(error); }
}

export async function getContactRequests(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const requests = await prisma.contactRequest.findMany({ orderBy: { createdAt: 'desc' } });
    return res.json({ requests });
  } catch (error) { next(error); }
}

// ============================================
// 6. NOTIFICATIONS
// ============================================
export async function getNotifications(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });
    return res.json({ notifications });
  } catch (error) { next(error); }
}

export async function markNotificationsAsRead(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    await prisma.notification.updateMany({
      where: { userId: req.user.id, read: false },
      data: { read: true }
    });
    return res.json({ message: 'All notifications marked as read.' });
  } catch (error) { next(error); }
}
