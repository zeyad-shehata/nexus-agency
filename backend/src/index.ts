import './config/env'; // Validate environment variables immediately
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import multer from 'multer';
import router from './routes';
import { initSocket } from './services/socket.service';
import { errorHandler } from './middleware/error.middleware';
import { uploadFile } from './services/upload.service';
import { logger } from './utils/logger';
import { requireAuth } from './middleware/auth.middleware';
import { setupSwagger } from './config/swagger';
import { env } from './config/env';

const app = express();
const server = createServer(app);

// 1. Initialize Socket.IO
initSocket(server);

// 2. Middlewares
app.use(helmet()); // Secure HTTP headers

const allowedOrigins = env.FRONTEND_URL
  ? [env.FRONTEND_URL]
  : ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Custom lightweight cookie parser — handles values containing '=' (e.g. base64 JWTs)
app.use((req: any, res, next) => {
  const cookies: any = {};
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    cookieHeader.split(';').forEach((cookie: string) => {
      const eqIndex = cookie.indexOf('=');
      if (eqIndex > 0) {
        const key = cookie.substring(0, eqIndex).trim();
        const value = cookie.substring(eqIndex + 1).trim();
        cookies[key] = value;
      }
    });
  }
  req.cookies = cookies;
  next();
});

// API Documentation Setup
setupSwagger(app as any);

// Health Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// 3. API Endpoints Routes
app.use('/api/v1', router);
app.use('/api', router); // Backward compatibility

// File upload endpoint (using Multer in-memory storage)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

app.post('/api/v1/upload', requireAuth, upload.single('file'), async (req: any, res: any, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided.' });
    }

    const { originalname, mimetype, buffer } = req.file;
    const result = await uploadFile(buffer, originalname, mimetype);
    
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// Serve local static uploads if any files are stored locally
app.use('/uploads', express.static('../public/uploads'));

// 4. Global Error Middleware
app.use(errorHandler);

// 5. Graceful Shutdown
function gracefulShutdown(signal: string) {
  logger.info(`\n${signal} received. Shutting down gracefully...`);
  server.close(() => {
    logger.info('HTTP server closed.');
    process.exit(0);
  });
  // Force close after 10s
  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down.');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle unhandled rejections
process.on('unhandledRejection', (reason: any) => {
  logger.error('Unhandled Rejection:', reason?.message || reason);
});

process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception:', error.message);
  process.exit(1);
});

// 6. Start Server
const PORT = env.PORT || '5000';
server.listen(parseInt(PORT, 10), () => {
  logger.info(`🚀 Nexus Production Backend running on port ${PORT}`);
});
