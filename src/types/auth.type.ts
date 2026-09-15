import type { Request } from 'express';

export interface RegisterType extends Request {
  email: string;
  password: string;
  password_confirmation: string;
  name: string;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface LogoutType {
  userId: string;
  token: string;
}

export type RefreshTokenType = LogoutType;
