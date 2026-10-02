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

export const startWorkoutSessionSchema = {
  body: z.object({
    workoutId: z.string(),
  }),
};

export const finishWorkoutSessionSchema = {
  body: z.object({
    exerciseCount: z.number(),
    setCount: z.number(),
    volume: z.number(),
  }),
};
