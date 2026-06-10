import { Request, Response, NextFunction } from 'express';

export function responseFormatter(req: Request, res: Response, next: NextFunction) {
  const originalJson = res.json;

  res.json = function (body: any) {
    if (res.statusCode >= 400) {
      const errorMsg = body?.error || body?.message || 'An error occurred';
      const formattedBody = {
        success: false,
        message: typeof errorMsg === 'string' ? errorMsg : 'Validation failed',
        error: body?.error || body?.details || 'Error'
      };
      return originalJson.call(this, formattedBody);
    }
    return originalJson.call(this, body);
  };

  next();
}
