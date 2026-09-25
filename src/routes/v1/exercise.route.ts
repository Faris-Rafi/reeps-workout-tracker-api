import { Router } from 'express';
import authenticate from '../../middlewares/authenticate.ts';
import { apiLimiter } from '../../middlewares/rateLimiter.ts';
import ExerciseController from '../../controllers/exercise.controller.ts';
import validate from '../../middlewares/validate.ts';
import {
  createExerciseSchema,
  deleteExerciseSchema,
} from '../../validations/exercise.validation.ts';

const router = Router();

router.use(apiLimiter);
router.get('/', authenticate, ExerciseController.getAllExercises);
router.post(
  '/create',
  authenticate,
  validate(createExerciseSchema),
  ExerciseController.createExercise
);
router.delete(
  '/delete',
  authenticate,
  validate(deleteExerciseSchema),
  ExerciseController.deleteExercise
);

export default router;
