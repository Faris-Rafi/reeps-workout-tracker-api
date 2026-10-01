import type { AuthedRequest } from '../middlewares/authenticate.ts';
import WorkoutService from '../services/workout.service.ts';
import { status as httpStatus } from 'http-status';
import type { Response } from 'express';
import type {
  ReqWorkout,
  ReqDeleteWorkout,
  ReqStartWorkout,
  ReqFinishWorkout,
} from '../types/workout.type.ts';

const WorkoutController = {
  getAllWorkouts: async (req: AuthedRequest, res: Response) => {
    const workouts = await WorkoutService.getAllWorkout({ userId: req.user?.id || '' });
    res.status(httpStatus.OK).send({ workouts });
  },
  createWorkout: async (req: ReqWorkout, res: Response) => {
    const workout = await WorkoutService.createWorkout({ ...req.body, userId: req.user?.id || '' });
    res.status(httpStatus.CREATED).send({ workout });
  },
  deleteWorkout: async (req: ReqDeleteWorkout, res: Response) => {
    await WorkoutService.deleteWorkout({ ...req.body, userId: req.user?.id || '' });
    res.status(httpStatus.OK).send({ message: 'Workout deleted successfully!' });
  },
  getThisMonthWorkoutSessions: async (req: AuthedRequest, res: Response) => {
    const sessions = await WorkoutService.getThisMonthWorkoutSessions({
      userId: req.user?.id || '',
    });
    res.status(httpStatus.OK).send({ sessions });
  },
  startWorkoutSession: async (req: ReqStartWorkout, res: Response) => {
    const session = await WorkoutService.startWorkoutSession({
      ...req.body,
      userId: req.user?.id || '',
    });
    res.status(httpStatus.CREATED).send({ session });
  },
  finishWorkoutSession: async (req: ReqFinishWorkout, res: Response) => {
    const session = await WorkoutService.finishWorkoutSession({
      ...req.body,
      userId: req.user?.id || '',
    });
    res.status(httpStatus.OK).send({ session });
  },
};

export default WorkoutController;
