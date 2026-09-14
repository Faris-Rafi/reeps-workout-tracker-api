import { Router } from 'express';
import validate from '../../middlewares/validate.ts';
import { registerSchema } from '../../validations/auth.validation.ts';
import AuthController from '../../controllers/auth.controller.ts';

const router = Router();

router.post('/register', validate(registerSchema), AuthController.register);

export default router;
