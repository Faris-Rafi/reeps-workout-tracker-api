import { Router } from 'express';
import validate from '../../middlewares/validate.ts';
import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
} from '../../validations/auth.validation.ts';
import AuthController from '../../controllers/auth.controller.ts';
import authenticate from '../../middlewares/authenticate.ts';

const router = Router();

router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);
router.get('/logout', authenticate, AuthController.logout);
router.post('/refresh-tokens', validate(refreshTokenSchema), AuthController.refreshTokens);

export default router;
