import { StudentsCollection } from '../db/models/student.js';

export const getAllStudents = async () => {
  const students = await StudentsCollection.find();
  return students;
};

export const getStudentsById = async (studentId) => {
  const student = await StudentsCollection.findById(studentId);
  return student;
};
