import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().optional().default('5000'),
  DATABASE_URL: z.string().min(10, 'DATABASE_URL must be a valid PostgreSQL connection string'),
  JWT_ACCESS_SECRET: z.string().min(16, 'JWT_ACCESS_SECRET must be at least 16 characters long'),
  JWT_REFRESH_SECRET: z.string().min(16, 'JWT_REFRESH_SECRET must be at least 16 characters long'),
  FRONTEND_URL: z.string().optional(),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  GEMINI_API_KEY: z.string().optional(),
  REDIS_URL: z.string().optional()
}).refine((data) => {
  if (data.NODE_ENV === 'production') {
    return !!data.CLOUDINARY_CLOUD_NAME && !!data.CLOUDINARY_API_KEY && !!data.CLOUDINARY_API_SECRET;
  }
  return true;
}, {
  message: "Cloudinary credentials (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) are required in production mode.",
  path: ["CLOUDINARY_CLOUD_NAME"]
}).refine((data) => {
  if (data.NODE_ENV === 'production') {
    return !!data.RESEND_API_KEY;
  }
  return true;
}, {
  message: "RESEND_API_KEY is required in production mode.",
  path: ["RESEND_API_KEY"]
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Environment Configuration Validation Failed:');
  parsed.error.errors.forEach(err => {
    console.error(`   - ${err.path.join('.')}: ${err.message}`);
  });
  process.exit(1);
}

export const env = parsed.data;
