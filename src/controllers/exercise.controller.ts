import { status as httpStatus } from 'http-status';
import type { Response } from 'express';
import ExerciceService from '../services/exercise.service.ts';
import type { GetExercisesType } from '../types/exercise.type.ts';

const ExerciseController = {
  getAllExercises: async (req: GetExercisesType, res: Response) => {
    const exercises = await ExerciceService.getAllExercise({ workoutId: req.params.workoutId });
    res.status(httpStatus.OK).send({ exercises });
  },
  // createWorkout: async (req: ReqWorkoutType, res: Response) => {
  //   const workout = await WorkoutService.createWorkout({ ...req.body, userId: req.user?.id || '' });
  //   res.status(httpStatus.CREATED).send({ workout });
  // },
  // deleteWorkout: async (req: ReqDeleteWorkoutType, res: Response) => {
  //   await WorkoutService.deleteWorkout({ ...req.body, userId: req.user?.id || '' });
  //   res.status(httpStatus.OK).send({ message: 'Workout deleted successfully!' });
  // },
};

export default ExerciseController;
