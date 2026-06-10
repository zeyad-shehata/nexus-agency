import { Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';
import prisma from '../config/db';
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from '../utils/validation';
import { sendWelcomeEmail, sendPasswordResetEmail } from '../services/email.service';
import { logger } from '../utils/logger';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { env } from '../config/env';

const ACCESS_SECRET = env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = env.JWT_REFRESH_SECRET;

// Token generation helpers
function generateAccessToken(payload: any) {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: '15m' });
}

function generateRefreshToken(payload: any, rememberMe: boolean = false) {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: rememberMe ? '30d' : '1d' });
}

// Cookie options helper
function getCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    maxAge,
    path: '/'
  };
}

// 1. Register User
export async function register(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const validatedData = registerSchema.parse(req.body);
    
    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(validatedData.password, salt);

    // Create User
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email.toLowerCase(),
        password: hashedPassword,
        phone: validatedData.phone,
        role: Role.USER // Default registered user is a standard user
      }
    });

    // Create a mock verification token (verify JWT)
    const verificationToken = jwt.sign({ id: user.id }, ACCESS_SECRET, { expiresIn: '24h' });

    // Send Welcome Email
    await sendWelcomeEmail(user.email, user.name, verificationToken);

    // Log Activity
    await logger.activity(user.id, 'USER_REGISTER', `New user registered: ${user.email}`);

    // Generate login tokens directly for convenience
    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.cookie('access_token', accessToken, getCookieOptions(15 * 60 * 1000));
    res.cookie('refresh_token', refreshToken, getCookieOptions(24 * 60 * 60 * 1000));

    return res.status(201).json({
      message: 'Registration successful. Verification email sent.',
      user: { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone },
      accessToken,
      refreshToken,
      token: accessToken // backward compatibility
    });
  } catch (error) {
    next(error);
  }
}

// 2. Login User
export async function login(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { email, password, rememberMe } = loginSchema.parse(req.body);
    
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload, rememberMe);

    // Set secure HTTP-only cookies
    res.cookie('access_token', accessToken, getCookieOptions(15 * 60 * 1000));
    res.cookie('refresh_token', refreshToken, getCookieOptions(
      rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000
    ));

    await logger.activity(user.id, 'USER_LOGIN', `User logged in successfully: ${user.email}`);

    return res.json({
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, phone: user.phone },
      accessToken,
      refreshToken,
      token: accessToken // backward compatibility
    });
  } catch (error) {
    next(error);
  }
}

// 3. Logout User
export async function logout(req: AuthenticatedRequest, res: Response) {
  if (req.user) {
    await logger.activity(req.user.id, 'USER_LOGOUT', `User logged out: ${req.user.email}`);
  }
  res.clearCookie('access_token', { path: '/' });
  res.clearCookie('refresh_token', { path: '/' });
  return res.json({ message: 'Logged out successfully.' });
}

// 4. Refresh Token Flow
export async function refresh(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.refresh_token || req.body.refreshToken;
  if (!token) {
    return res.status(401).json({ error: 'Refresh token missing.' });
  }

  try {
    const decoded = jwt.verify(token, REFRESH_SECRET) as { id: string; email: string; role: Role };
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    
    if (!user) {
      return res.status(401).json({ error: 'User does not exist.' });
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const newAccessToken = generateAccessToken(payload);

    res.cookie('access_token', newAccessToken, getCookieOptions(15 * 60 * 1000));

    return res.json({ token: newAccessToken, accessToken: newAccessToken });
  } catch (e) {
    return res.status(403).json({ error: 'Invalid or expired refresh token.' });
  }
}

// 5. Get Current User Profile
export async function me(req: AuthenticatedRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true, avatar: true, phone: true, emailVerified: true }
    });
    return res.json({ user });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to retrieve profile.' });
  }
}

// 6. Forgot Password
export async function forgotPassword(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { email } = forgotPasswordSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    
    if (!user) {
      // Return 200 to prevent user enumeration attacks
      return res.json({ message: 'If this email exists in our records, a reset link has been sent.' });
    }

    // Sign a transient reset token
    const resetToken = jwt.sign({ id: user.id }, ACCESS_SECRET, { expiresIn: '1h' });

    await sendPasswordResetEmail(user.email, resetToken);
    await logger.activity(user.id, 'FORGOT_PASSWORD_REQUEST', `Reset password requested for: ${user.email}`);

    return res.json({ message: 'If this email exists in our records, a reset link has been sent.' });
  } catch (error) {
    next(error);
  }
}

// 7. Reset Password
export async function resetPassword(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { token, password } = resetPasswordSchema.parse(req.body);
    
    const decoded = jwt.verify(token, ACCESS_SECRET) as { id: string };
    
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.update({
      where: { id: decoded.id },
      data: { password: hashedPassword }
    });

    await logger.activity(user.id, 'PASSWORD_RESET_COMPLETE', `Password successfully reset for: ${user.email}`);

    return res.json({ message: 'Password has been reset successfully. You can now log in.' });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ error: 'Invalid or expired reset token.' });
    }
    next(error);
  }
}

// 8. Verify Email
export async function verifyEmail(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { token } = req.query;
    if (!token || typeof token !== 'string') {
      return res.status(400).json({ error: 'Verification token is required.' });
    }

    const decoded = jwt.verify(token, ACCESS_SECRET) as { id: string };
    
    const user = await prisma.user.update({
      where: { id: decoded.id },
      data: { emailVerified: true }
    });

    await logger.activity(user.id, 'EMAIL_VERIFICATION_COMPLETE', `Email successfully verified for user: ${user.email}`);

    return res.json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ error: 'Invalid or expired verification token.' });
    }
    next(error);
  }
}

// 9. Change Password
export async function changePassword(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized.' });
    }

    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required.' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters long.' });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect current password.' });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashedPassword }
    });

    await logger.activity(user.id, 'PASSWORD_CHANGE_COMPLETE', `Password changed successfully for user: ${user.email}`);

    return res.json({ message: 'Password changed successfully.' });
  } catch (error) {
    next(error);
  }
}
