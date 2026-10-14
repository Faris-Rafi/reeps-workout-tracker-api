import { SessionModel } from '../models/session.model.ts';
import { WorkoutModel } from '../models/workout.model.ts';
import type {
  CreateWorkout,
  CreateWorkoutSession,
  UpdateWorkoutSession,
} from '../types/workout.type.ts';
import { ApiError } from '../utils/ApiError.ts';
import { status as httpStatus } from 'http-status';

const WorkoutService = {
  getAllWorkout: (data: { userId: string }) => {
    return WorkoutModel.getWorkoutsByUserId({ ...data });
  },
  createWorkout: (data: CreateWorkout) => {
    return WorkoutModel.create({ ...data });
  },
  deleteWorkout: (data: { id: string; userId: string }) => {
    const workout = WorkoutModel.findWorkoutById({ id: data.id });

    if (!workout) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Workout not Found');
    }

    return WorkoutModel.delete({ ...data });
  },
  getThisMonthWorkoutSessions: (data: { userId: string }) => {
    return SessionModel.thisMonthSessions({ ...data });
  },
  getThisWeekWorkoutSessions: (data: { userId: string }) => {
    return SessionModel.thisWeekSessions({ ...data });
  },
  startWorkoutSession: (data: CreateWorkoutSession) => {
    return SessionModel.create({ ...data });
  },
  finishWorkoutSession: (data: UpdateWorkoutSession) => {
    return SessionModel.update({ ...data });
  },
};

export default WorkoutService;
