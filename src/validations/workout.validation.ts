import { z } from 'zod';

export const createWorkoutSchema = {
  body: z.object({
    name: z.string(),
    description: z.string().optional(),
    bgColor: z.object({
      to: z.string(),
      from: z.string(),
      angle: z.number(),
    }),
  }),
};

export const deleteWorkoutSchema = {
  body: z.object({
    id: z.string(),
  }),
};
