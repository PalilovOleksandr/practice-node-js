import { Router } from 'express';
import {
  getStudentsByIdController,
  getStudentsController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

export default router;

router.get('/students', ctrlWrapper(getStudentsController));
router.get('/students/:studentId', ctrlWrapper(getStudentsByIdController));
