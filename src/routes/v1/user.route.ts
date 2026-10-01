import { Router } from 'express';
import authenticate from '../../middlewares/authenticate.ts';
import { apiLimiter } from '../../middlewares/rateLimiter.ts';
import validate from '../../middlewares/validate.ts';
import UserController from '../../controllers/user.controller.ts';
import {
  updateUserPasswordSchema,
  updateUserProfileSchema,
} from '../../validations/user.validation.ts';

const router = Router();

router.use(apiLimiter);
router.put(
  '/update',
  authenticate,
  validate(updateUserProfileSchema),
  UserController.updateProfile
);
router.put(
  '/update-password',
  authenticate,
  validate(updateUserPasswordSchema),
  UserController.updatePassword
);

export default router;
