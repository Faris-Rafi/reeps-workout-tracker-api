import { Router } from 'express';
import authenticate from '../../middlewares/authenticate.ts';
import WorkoutController from '../../controllers/workout.controller.ts';
import validate from '../../middlewares/validate.ts';
import { createWorkoutSchema, deleteWorkoutSchema } from '../../validations/workout.validation.ts';
import { apiLimiter } from '../../middlewares/rateLimiter.ts';

const router = Router();

router.use(apiLimiter);
router.get('/', authenticate, WorkoutController.getAllWorkouts);
router.post(
  '/create',
  authenticate,
  validate(createWorkoutSchema),
  WorkoutController.createWorkout
);
router.delete(
  '/delete',
  authenticate,
  validate(deleteWorkoutSchema),
  WorkoutController.deleteWorkout
);

export default router;
