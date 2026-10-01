import type { AuthedRequest } from '../middlewares/authenticate.ts';

export interface GradientColor {
  from: string;
  to: string;
  angle: number;
}

export interface ReqWorkout extends AuthedRequest {
  body: {
    name: string;
    description?: string;
    bgColor: GradientColor;
  };
}

export interface ReqDeleteWorkout extends AuthedRequest {
  body: {
    id: string;
  };
}

export interface ReqStartWorkout extends AuthedRequest {
  body: {
    workoutId: string;
  };
}

export interface ReqFinishWorkout extends AuthedRequest {
  body: {
    workoutId: string;
    exerciseCount: number;
    setCount: number;
    volume: number;
  };
}

export interface CreateWorkout {
  name: string;
  description?: string;
  bgColor: GradientColor;
  userId: string;
}

export interface CreateWorkoutSession {
  userId: string;
  workoutId: string;
}

export interface UpdateWorkoutSession {
  userId: string;
  workoutId: string;
  exerciseCount: number;
  setCount: number;
  volume: number;
}
