import type { AuthedRequest } from '../middlewares/authenticate.ts';
import WorkoutService from '../services/workout.service.ts';
import { status as httpStatus } from 'http-status';
import type { Response } from 'express';
import type { ReqDeleteWorkoutType, ReqWorkoutType } from '../types/workout.type.ts';

const WorkoutController = {
  getAllWorkouts: async (req: AuthedRequest, res: Response) => {
    const workouts = await WorkoutService.getAllWorkout({ userId: req.user?.id || '' });
    res.status(httpStatus.OK).send({ workouts });
  },
  createWorkout: async (req: ReqWorkoutType, res: Response) => {
    const workout = await WorkoutService.createWorkout({ ...req.body, userId: req.user?.id || '' });
    res.status(httpStatus.CREATED).send({ workout });
  },
  deleteWorkout: async (req: ReqDeleteWorkoutType, res: Response) => {
    await WorkoutService.deleteWorkout({ ...req.body, userId: req.user?.id || '' });
    res.status(httpStatus.OK).send({ message: 'Workout deleted successfully!' });
  },
};

export default WorkoutController;
