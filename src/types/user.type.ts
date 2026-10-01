import type { AuthedRequest } from '../middlewares/authenticate';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  height: string;
  weight: string;
  statusId: string;
}

export interface UpdateUserProfile {
  name?: string;
  email: string;
  height?: string;
  weight?: string;
  weeklyGoal?: number;
}

export interface UpdateUserPassword {
  email: string;
  currentPassword: string;
  oldPassword: string;
  newPassword: string;
  passwordConfirmation: string;
}

export interface ReqUpdateUserProfile extends AuthedRequest {
  body: {
    name?: string;
    height?: string;
    weight?: string;
    weeklyGoal?: number;
  };
}

export interface ReqUpdateUserPassword extends AuthedRequest {
  body: {
    oldPassword: string;
    newPassword: string;
    passwordConfirmation: string;
  };
}
