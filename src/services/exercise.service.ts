import { ExerciseModel } from '../models/exercise.model.ts';

const ExerciceService = {
  getAllExercise: (data: { workoutId: string }) => {
    return ExerciseModel.getExercisesByWorkoutId({ ...data });
  },
  // createWorkout: (data: CreateWorkout) => {
  //   return WorkoutModel.create({ ...data });
  // },
  // deleteWorkout: (data: { id: string; userId: string }) => {
  //   return WorkoutModel.delete({ ...data });
  // },
};

export default ExerciceService;
