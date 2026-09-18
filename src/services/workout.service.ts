import { WorkoutModel } from '../models/workout.model.ts';
import type { CreateWorkout } from '../types/workout.type.ts';

const WorkoutService = {
  getAllWorkout: (data: { userId: string }) => {
    return WorkoutModel.getWorkoutsByUserId({ ...data });
  },
  createWorkout: (data: CreateWorkout) => {
    return WorkoutModel.create({ ...data });
  },
  deleteWorkout: (data: { id: string; userId: string }) => {
    return WorkoutModel.delete({ ...data });
  },
};

export default WorkoutService;
