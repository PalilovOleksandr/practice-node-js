import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';

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

  // Middleware error
  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'something went wrong',
      error: err.message,
    });
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`${PORT} it's ok`);
  });
};
