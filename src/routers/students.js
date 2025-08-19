import { Router } from 'express';
import {
  createStudentController,
  deleteStudentController,
  getStudentsByIdController,
  getStudentsController,
  patchStudentController,
  upsertStudentController,
} from '../controllers/students.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/students.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constatns/index.js';

const router = Router();
router.use(authenticate);

router.get('/', checkRoles(ROLES.TEACHER), getStudentsController);

router.get(
  '/:studentId',
  checkRoles(...Object.values(ROLES)),
  isValidId,
  getStudentsByIdController,
);

router.post(
  '/',
  checkRoles(ROLES.TEACHER),
  validateBody(createStudentSchema),
  createStudentController,
);

router.delete(
  '/:studentId',
  checkRoles(ROLES.TEACHER),
  deleteStudentController,
);

router.put(
  '/:studentId',
  checkRoles(ROLES.TEACHER),
  isValidId,
  validateBody(updateStudentSchema),
  upsertStudentController,
);

router.patch(
  '/:studentId',
  checkRoles(...Object.values(ROLES)),
  isValidId,
  validateBody(updateStudentSchema),
  patchStudentController,
);

export default router;
