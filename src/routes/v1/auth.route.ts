import { Router } from 'express';
import validate from '../../middlewares/validate.ts';
import {
  loginSchema,
  logoutSchema,
  refreshTokensSchema,
  registerSchema,
} from '../../validations/auth.validation.ts';
import AuthController from '../../controllers/auth.controller.ts';

const router = Router();

router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);
router.post('/logout', validate(logoutSchema), AuthController.logout);
router.post('/refresh-tokens', validate(refreshTokensSchema), AuthController.refreshTokens);

export default router;
