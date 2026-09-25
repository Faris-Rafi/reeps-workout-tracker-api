import { z } from 'zod';

export const createExerciseSchema = {
  body: z.object({
    name: z.string(),
    sets: z.number(),
    reps: z.number(),
    weight: z.number().optional(),
    measurementUnitId: z.string(),
    equipment: z.string(),
    restTime: z.number(),
    workoutId: z.string(),
  }),
};

export const deleteExerciseSchema = {
  body: z.object({
    id: z.string(),
  }),
};
