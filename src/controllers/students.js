import createHttpError from 'http-errors';
import { getAllStudents, getStudentsById } from '../services/students.js';

export const getStudentsController = async (req, res, next) => {
  const students = await getAllStudents();
  res.status(200).json({
    status: 200,
    message: 'Successfully found students',
    data: students,
  });
};

export const getStudentsByIdController = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await getStudentsById(studentId);

  if (!student) {
    throw createHttpError(404, 'Student not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found student with id ${studentId}!`,
    data: student,
  });
};
