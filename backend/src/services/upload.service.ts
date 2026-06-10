import { cloudinary, isCloudinaryConfigured } from '../config/cloudinary';
import { logger } from '../utils/logger';
import fs from 'fs';
import path from 'path';

// Local uploads directory fallback
const LOCAL_UPLOADS_DIR = path.join(__dirname, '../../../public/uploads');

if (!fs.existsSync(LOCAL_UPLOADS_DIR)) {
  fs.mkdirSync(LOCAL_UPLOADS_DIR, { recursive: true });
}

const ALLOWED_MIME_TYPES = [
  'image/jpeg', 'image/png', 'image/gif', 'image/webp',
  'application/pdf', 'application/msword', 
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain', 'application/zip', 
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf', '.doc', '.docx', '.txt', '.zip', '.xls', '.xlsx'];

export function isFileSafe(filename: string, mimeType: string): boolean {
  const ext = path.extname(filename).toLowerCase();
  const isExtAllowed = ALLOWED_EXTENSIONS.includes(ext);
  const isMimeAllowed = ALLOWED_MIME_TYPES.includes(mimeType);
  return isExtAllowed && isMimeAllowed;
}

export interface UploadResult {
  url: string;
  filename: string;
  size: string;
}

export async function uploadFile(
  fileBuffer: Buffer,
  filename: string,
  mimeType: string
): Promise<UploadResult> {
  if (!isFileSafe(filename, mimeType)) {
    throw new Error('Security Exception: Upload file format or extension is restricted.');
  }

  const fileSizeInKB = (fileBuffer.length / 1024).toFixed(1) + ' KB';

  if (isCloudinaryConfigured) {
    try {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'auto',
            folder: 'nexus_agency',
            public_id: path.parse(filename).name
          },
          (error, result) => {
            if (error) {
              logger.error('❌ Cloudinary stream upload failed:', error);
              return reject(error);
            }
            if (!result) {
              return reject(new Error('Cloudinary upload returned empty result.'));
            }
            resolve({
              url: result.secure_url,
              filename,
              size: fileSizeInKB
            });
          }
        );
        uploadStream.end(fileBuffer);
      });
    } catch (e: any) {
      logger.error('❌ Cloudinary upload crashed, falling back to local storage:', e.message);
    }
  }

  // Fallback: Save to Local Public Folder
  const sanitizedFilename = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const localFilePath = path.join(LOCAL_UPLOADS_DIR, sanitizedFilename);
  
  fs.writeFileSync(localFilePath, fileBuffer);
  logger.info(`💾 File saved locally: /uploads/${sanitizedFilename}`);

  return {
    url: `/uploads/${sanitizedFilename}`,
    filename,
    size: fileSizeInKB
  };
}
