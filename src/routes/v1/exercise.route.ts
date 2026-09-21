import { Router } from 'express';
import authenticate from '../../middlewares/authenticate.ts';
import { apiLimiter } from '../../middlewares/rateLimiter.ts';
import ExerciseController from '../../controllers/exercise.controller.ts';

const router = Router();

router.use(apiLimiter);
router.get('/', authenticate, ExerciseController.getAllExercises);
// router.post(
//   '/create',
//   authenticate,
//   validate(createWorkoutSchema),
//   WorkoutController.createWorkout
// );
// router.delete(
//   '/delete',
//   authenticate,
//   validate(deleteWorkoutSchema),
//   WorkoutController.deleteWorkout
// );

export default router;
