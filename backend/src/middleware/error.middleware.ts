import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { logger } from '../utils/logger';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error('🔥 Server Error Captured:', err.message || err);

  // Zod validation handler
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message
      }))
    });
  }

  // Prisma database handler
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique key violation
    if (err.code === 'P2002') {
      const target = (err.meta?.target as string[]) || [];
      return res.status(409).json({
        error: `Conflict: A record with this ${target.join(', ')} already exists.`
      });
    }
    // Record not found
    if (err.code === 'P2025') {
      return res.status(404).json({
        error: 'Resource not found.'
      });
    }
  }

  const isDev = process.env.NODE_ENV === 'development';
  return res.status(err.status || 500).json({
    error: err.message || 'An unexpected error occurred on the server.',
    stack: isDev ? err.stack : undefined
  });
}
