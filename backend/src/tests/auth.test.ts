import { requireAuth, requireAdmin, requireUser, AuthenticatedRequest } from '../middleware/auth.middleware';
import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { Role } from '@prisma/client';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'nexus_super_access_secret_key_129381!@#';

describe('Auth Middleware Unit Tests', () => {
  let mockRequest: Partial<AuthenticatedRequest>;
  let mockResponse: Partial<Response>;
  let nextFunction: jest.Mock;

  beforeEach(() => {
    mockRequest = {
      headers: {},
      cookies: {}
    };
    nextFunction = jest.fn();
    
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    mockResponse = res;
  });

  describe('requireAuth', () => {
    it('should return 401 if no authorization header or cookie is provided', () => {
      requireAuth(mockRequest as AuthenticatedRequest, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Access denied. No token provided.' });
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should return 403 if token is invalid or corrupted', () => {
      mockRequest.headers = { authorization: 'Bearer invalid-token-xyz' };

      requireAuth(mockRequest as AuthenticatedRequest, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid or expired token.' });
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should succeed, populate req.user, and call next() if valid header token is provided', () => {
      const payload = { id: 'user-uuid', email: 'test@nexus.agency', role: 'USER' as Role };
      const token = jwt.sign(payload, ACCESS_SECRET, { expiresIn: '1h' });
      mockRequest.headers = { authorization: `Bearer ${token}` };

      requireAuth(mockRequest as AuthenticatedRequest, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalled();
      expect(mockRequest.user).toBeDefined();
      expect(mockRequest.user?.id).toBe(payload.id);
      expect(mockRequest.user?.email).toBe(payload.email);
      expect(mockRequest.user?.role).toBe(payload.role);
    });

    it('should succeed and call next() if valid token is provided in cookies', () => {
      const payload = { id: 'admin-uuid', email: 'admin@nexus.agency', role: 'ADMIN' as Role };
      const token = jwt.sign(payload, ACCESS_SECRET, { expiresIn: '1h' });
      mockRequest.cookies = { access_token: token };

      requireAuth(mockRequest as AuthenticatedRequest, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalled();
      expect(mockRequest.user?.role).toBe('ADMIN');
    });
  });

  describe('requireAdmin', () => {
    it('should return 401 if req.user is missing', () => {
      requireAdmin(mockRequest as AuthenticatedRequest, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Unauthorized.' });
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should return 403 if user role is not ADMIN', () => {
      mockRequest.user = { id: 'client-id', email: 'client@nexus.agency', role: 'USER' as Role };

      requireAdmin(mockRequest as AuthenticatedRequest, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Forbidden. You do not have permissions to perform this action.' });
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should call next() if user role is ADMIN', () => {
      mockRequest.user = { id: 'admin-id', email: 'admin@nexus.agency', role: 'ADMIN' as Role };

      requireAdmin(mockRequest as AuthenticatedRequest, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe('requireUser', () => {
    it('should return 401 if req.user is missing', () => {
      requireUser(mockRequest as AuthenticatedRequest, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Unauthorized.' });
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should call next() if user role is USER', () => {
      mockRequest.user = { id: 'user-id', email: 'user@nexus.agency', role: 'USER' as Role };

      requireUser(mockRequest as AuthenticatedRequest, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalled();
    });

    it('should call next() if user role is ADMIN (fallback protection)', () => {
      mockRequest.user = { id: 'admin-id', email: 'admin@nexus.agency', role: 'ADMIN' as Role };

      requireUser(mockRequest as AuthenticatedRequest, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalled();
    });
  });
});
