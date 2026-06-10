import { v2 as cloudinary } from 'cloudinary';
import { logger } from '../utils/logger';
import { env } from '../config/env';

const isCloudinaryConfigured = 
  !!env.CLOUDINARY_CLOUD_NAME && 
  !!env.CLOUDINARY_API_KEY && 
  !!env.CLOUDINARY_API_SECRET;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true
  });
  logger.info('☁️ Cloudinary configured successfully.');
} else {
  logger.warn('⚠️ Cloudinary credentials missing. Falling back to local/mock upload simulator.');
}

export { cloudinary, isCloudinaryConfigured };
