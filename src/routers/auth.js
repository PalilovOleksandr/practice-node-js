import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import {
  loginUserController,
  logoutUserController,
  refreshUsersSessionController,
  registerUserController,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  registerUserController,
);

router.post('/login', validateBody(loginUserSchema), loginUserController);

router.post('/logout', logoutUserController);

router.post('/refresh', refreshUsersSessionController);

router.post(
  '/request-reset-email',
  validateBody(requestResetEmailSchema),
  requestResetEmailController,
);

router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  resetPasswordController,
);

export default router;
