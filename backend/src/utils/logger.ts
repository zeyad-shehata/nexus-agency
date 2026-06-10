import prisma from '../config/db';

export const logger = {
  info: (msg: string, details?: any) => {
    console.log(`[INFO] ${new Date().toISOString()}: ${msg}`, details || '');
  },
  error: (msg: string, err?: any) => {
    console.error(`[ERROR] ${new Date().toISOString()}: ${msg}`, err || '');
  },
  warn: (msg: string, details?: any) => {
    console.warn(`[WARN] ${new Date().toISOString()}: ${msg}`, details || '');
  },
  
  // Save activity logs directly to DB
  activity: async (userId: string | null, action: string, details: string) => {
    try {
      await prisma.activityLog.create({
        data: {
          userId,
          action,
          details
        }
      });
      console.log(`[ACTIVITY LOG] User: ${userId || 'GUEST'} | Action: ${action} | Details: ${details}`);
    } catch (e: any) {
      console.error('[LOGGER ERROR] Failed to write activity log to database:', e.message);
    }
  }
};
