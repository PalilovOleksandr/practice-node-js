import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import studentsRouter from './routers/students.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  // CORS
  app.use(cors());

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
  app.use(studentsRouter);

  // Middleware error
  app.use(notFoundHandler);
  app.use(errorHandler);

  // Start server
  app.listen(PORT, () => {
    console.log(`${PORT} it's ok`);
  });
};
