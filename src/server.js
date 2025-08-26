import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constatns/index.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  // CORS
  app.use(cors());
  // Cookie
  app.use(cookieParser());
  // Pino http
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // GET
  app.get('/', (req, res) => {
    res.json({ message: 'Hello world!' });
  });

  // Middleware
  app.use(router);
  app.use('/uploads', express.static(UPLOAD_DIR));

  // Middleware error
  app.use(notFoundHandler);
  app.use(errorHandler);

  // Start server
  app.listen(PORT, () => {
    console.log(`${PORT} it's ok`);
  });
};
