import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

interface RateLimitConfig {
  windowMs: number;
  max: number;
  message: string;
}

const ipRequestMap = new Map<string, { count: number; resetTime: number }>();

// Periodic cleanup of expired entries to prevent memory leaks
const CLEANUP_INTERVAL = 60 * 1000; // 1 minute
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of ipRequestMap.entries()) {
    if (now > data.resetTime) {
      ipRequestMap.delete(ip);
    }
  }
}, CLEANUP_INTERVAL);

export function rateLimiter(config: RateLimitConfig) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const currentTime = Date.now();
    
    let ipData = ipRequestMap.get(ip);
    
    if (!ipData || currentTime > ipData.resetTime) {
      // Initialize or reset window
      ipData = {
        count: 1,
        resetTime: currentTime + config.windowMs
      };
      ipRequestMap.set(ip, ipData);
      return next();
    }
    
    ipData.count++;
    
    if (ipData.count > config.max) {
      const retryAfterMs = ipData.resetTime - currentTime;
      logger.warn(`🛑 Rate limit hit for IP: ${ip} | Request count: ${ipData.count}`);
      res.setHeader('Retry-After', Math.ceil(retryAfterMs / 1000).toString());
      return res.status(429).json({
        error: config.message,
        retryAfterMs
      });
    }
    
    next();
  };
}
