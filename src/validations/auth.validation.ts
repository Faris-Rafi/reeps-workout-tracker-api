import { z } from 'zod';

export const registerSchema = {
  body: z
    .object({
      name: z.string().min(1, 'Name is required'),
      email: z.email('Invalid email format'),
      password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[a-zA-Z]/, 'Password must contain at least one letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
      password_confirmation: z.string().min(8, 'Password must be at least 8 characters'),
    })
    .refine((data) => data.password === data.password_confirmation, {
      error: 'Passwords do not match',
      path: ['password_confirmation'],
    }),
};

export const loginSchema = {
  body: z.object({
    email: z.email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  }),
};

export const logoutSchema = {
  body: z.object({
    userId: z.string(),
    token: z.string(),
  }),
};

export const refreshTokensSchema = {
  body: z.object({
    userId: z.string(),
    token: z.string(),
  }),
};
