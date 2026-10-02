import { Router } from 'express';
import authenticate from '../../middlewares/authenticate.ts';
import { apiLimiter } from '../../middlewares/rateLimiter.ts';
import validate from '../../middlewares/validate.ts';
import UserController from '../../controllers/user.controller.ts';
import {
  updateUserPasswordSchema,
  updateUserProfileSchema,
} from '../../validations/user.validation.ts';
import multer, { memoryStorage } from 'multer';

const upload = multer({
  storage: memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024, files: 1 },
});

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
router.put('/update-avatar', authenticate, upload.single('avatar'), UserController.updateAvatar);

export default router;
