import type { AuthedRequest } from '../middlewares/authenticate.ts';

export interface GetExercisesType extends AuthedRequest {
  params: {
    workoutId: string;
  };
}

export interface CreateExercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  measurementUnitId: string;
  equipment?: string;
  restTime: number;
  image: string;
}
