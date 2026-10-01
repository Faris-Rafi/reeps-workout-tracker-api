import { z } from 'zod';

export const updateUserProfileSchema = {
  body: z.object({
    name: z.string().optional(),
    height: z.string().optional(),
    weight: z.string().optional(),
    weeklyGoal: z.number().optional(),
  }),
};

export const updateUserPasswordSchema = {
  body: z.object({
    oldPassword: z.string().min(6).max(100),
    newPassword: z.string().min(6).max(100),
    passwordConfirmation: z.string().min(6).max(100),
  }),
};
