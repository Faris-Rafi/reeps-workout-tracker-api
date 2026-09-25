import { WorkoutModel } from '../models/workout.model.ts';
import type { CreateWorkout } from '../types/workout.type.ts';
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
};

export default WorkoutService;
