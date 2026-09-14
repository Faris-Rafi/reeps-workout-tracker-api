import type { Request } from 'express';

export interface RegisterType extends Request {
  email: string;
  password: string;
  password_confirmation: string;
  name: string;
}
