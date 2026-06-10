import { Resend } from 'resend';
import { logger } from '../utils/logger';
import { env } from '../config/env';

const isResendConfigured = !!env.RESEND_API_KEY;
let resend: Resend | null = null;

if (isResendConfigured) {
  resend = new Resend(env.RESEND_API_KEY);
  logger.info('✉️ Resend email service configured.');
} else {
  logger.warn('⚠️ Resend API key missing. Falling back to local console email logger.');
}

export { resend, isResendConfigured };
