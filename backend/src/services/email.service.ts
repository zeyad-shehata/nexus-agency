import { resend, isResendConfigured } from '../config/resend';
import { logger } from '../utils/logger';
import { env } from '../config/env';

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

// Resolve the frontend base URL for email links
function getFrontendUrl(): string {
  return env.FRONTEND_URL || 'http://localhost:3000';
}

async function sendEmail({ to, subject, html }: EmailPayload) {
  if (!isResendConfigured || !resend) {
    logger.info(`✉️ [EMAIL SENT - DRY RUN] To: ${to} | Subject: ${subject}`);
    return;
  }

  try {
    const data = await resend.emails.send({
      from: 'Nexus Agency <onboarding@resend.dev>',
      to,
      subject,
      html
    });
    logger.info(`✉️ Email successfully dispatched to ${to}. ID: ${data.data?.id}`);
  } catch (error: any) {
    logger.error(`❌ Failed to send email to ${to}:`, error.message);
  }
}

// 1. Welcome & Email Verification
export async function sendWelcomeEmail(to: string, name: string, token: string) {
  const baseUrl = getFrontendUrl();
  const verificationUrl = `${baseUrl}/auth?token=${token}&mode=verify`;
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:20px;background:#06060b;color:#f3f4f6;border-radius:12px;border:1px solid #1f2937;">
      <h1 style="color:#7c5cfc;">Welcome to Nexus Agency, ${name}!</h1>
      <p>Thank you for registering. Please click the button below to verify your email address:</p>
      <div style="margin:30px 0;">
        <a href="${verificationUrl}" style="background:#7c5cfc;color:white;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:bold;">Verify Email</a>
      </div>
      <p style="color:#9ca3af;font-size:12px;">Or copy and paste this link: ${verificationUrl}</p>
    </div>
  `;
  await sendEmail({ to, subject: 'Welcome to Nexus — Verify Email', html });
}

// 2. Password Reset
export async function sendPasswordResetEmail(to: string, token: string) {
  const baseUrl = getFrontendUrl();
  const resetUrl = `${baseUrl}/auth?token=${token}&mode=reset`;
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:20px;background:#06060b;color:#f3f4f6;border-radius:12px;border:1px solid #1f2937;">
      <h1 style="color:#7c5cfc;">Password Reset Request</h1>
      <p>You requested a password reset. Please click the button below to reset your password. This link will expire in 1 hour.</p>
      <div style="margin:30px 0;">
        <a href="${resetUrl}" style="background:#7c5cfc;color:white;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:bold;">Reset Password</a>
      </div>
      <p style="color:#9ca3af;font-size:12px;">Or copy and paste this link: ${resetUrl}</p>
    </div>
  `;
  await sendEmail({ to, subject: 'Nexus — Password Reset Request', html });
}

// 3. Project Submission Confirmation
export async function sendProjectSubmissionEmail(to: string, clientName: string, projectTitle: string) {
  const baseUrl = getFrontendUrl();
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:20px;background:#06060b;color:#f3f4f6;border-radius:12px;border:1px solid #1f2937;">
      <h1 style="color:#00d4aa;">Project Brief Received!</h1>
      <p>Hello ${clientName},</p>
      <p>We have received your project proposal for <strong>${projectTitle}</strong>.</p>
      <p>Our team is currently reviewing your preferences and budget. We will get back to you within 24 hours with an initial design plan and pricing breakdown.</p>
      <div style="margin:20px 0;padding:15px;background:#111827;border-radius:6px;border-left:4px solid #00d4aa;">
        You can track your project status at: <a href="${baseUrl}/tracker" style="color:#00d4aa;">nexus.agency/tracker</a>
      </div>
    </div>
  `;
  await sendEmail({ to, subject: 'Project Proposal Received — Nexus', html });
}

// 4. Project Status Updates
export async function sendProjectStatusUpdateEmail(to: string, clientName: string, projectTitle: string, status: string) {
  const baseUrl = getFrontendUrl();
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:20px;background:#06060b;color:#f3f4f6;border-radius:12px;border:1px solid #1f2937;">
      <h1 style="color:#7c5cfc;">Project Status Updated</h1>
      <p>Hello ${clientName},</p>
      <p>The status of your project <strong>${projectTitle}</strong> has been updated to: <span style="font-weight:bold;color:#7c5cfc;">${status}</span>.</p>
      <p>Log in to your dashboard to review deliverables or message your lead designer.</p>
      <div style="margin:30px 0;">
        <a href="${baseUrl}/dashboard" style="background:#7c5cfc;color:white;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:bold;">View Dashboard</a>
      </div>
    </div>
  `;
  await sendEmail({ to, subject: `Project Status Update: ${projectTitle} — Nexus`, html });
}
