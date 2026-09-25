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
  userId: string;
  workoutId: string;
}

export interface ReqCreateExercise extends AuthedRequest {
  body: {
    name: string;
    sets: number;
    reps: number;
    weight?: number;
    measurementUnitId: string;
    equipment?: string;
    restTime: number;
    workoutId: string;
  };
}

export interface ReqDeleteExercise extends AuthedRequest {
  body: {
    id: string;
  };
}
