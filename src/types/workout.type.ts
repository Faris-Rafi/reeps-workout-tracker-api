import type { AuthedRequest } from '../middlewares/authenticate.ts';

export interface GradientColor {
  from: string;
  to: string;
  angle: number;
}

export interface ReqWorkoutType extends AuthedRequest {
  body: {
    name: string;
    description?: string;
    bgColor: GradientColor;
  };
}

export interface CreateWorkout {
  name: string;
  description?: string;
  bgColor: GradientColor;
  userId: string;
}

export interface ReqDeleteWorkoutType extends AuthedRequest {
  body: {
    id: string;
  };
}
