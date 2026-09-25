import { ExerciseModel } from '../models/exercise.model.ts';
import type { CreateExercise } from '../types/exercise.type.ts';
import { status as httpStatus } from 'http-status';
import { ApiError } from '../utils/ApiError.ts';

const ExerciceService = {
  getAllExercise: (data: { workoutId: string }) => {
    return ExerciseModel.getExercisesByWorkoutId({ ...data });
  },
  createExercise: (data: CreateExercise) => {
    return ExerciseModel.create({ ...data });
  },
  deleteExercise: async (data: { id: string; userId: string }) => {
    const exercise = await ExerciseModel.findExerciseById({ id: data.id });

    if (!exercise) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Exercise not Found');
    }

    return ExerciseModel.delete({ ...data });
  },
};

export default ExerciceService;
