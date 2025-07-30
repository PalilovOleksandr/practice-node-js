import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { getAllStudents, getStudentsById } from './services/students.js';

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
  app.get('/students', async (req, res) => {
    const students = await getAllStudents();
    res.status(200).json({
      data: students,
    });
  });
  app.get('/students/:studentId', async (req, res, next) => {
    const { studentId } = req.params;
    const student = await getStudentsById(studentId);

    if (!student) {
      res.status(404).json({
        message: 'Student not found',
      });
      return;
    }

    res.status(200).json({
      data: student,
    });
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
