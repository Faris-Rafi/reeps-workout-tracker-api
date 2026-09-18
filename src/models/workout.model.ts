import { db } from '../prisma/db.ts';
import type { Char, JsonValue } from '@prisma/orm-postgres/target/codec-types';
import type { CreateWorkout } from '../types/workout.type.ts';

const prisma = db.orm.public;

export const WorkoutModel = {
  findWorkoutById: (data: { id: string }) => {
    const id = data.id as Char<36>;
    return prisma.Workout.where({ id }).first();
  },
  getWorkoutsByUserId: (data: { userId: string }) => {
    const userId = data.userId as Char<36>;
    return prisma.Workout.where({ userId }).all();
  },
  create: (data: CreateWorkout) => {
    const userId = data.userId as Char<36>;
    const bgColor = data.bgColor as unknown as JsonValue;
    return prisma.Workout.create({ ...data, userId, bgColor });
  },
  delete: (data: { id: string; userId: string }) => {
    const id = data.id as Char<36>;
    const userId = data.userId as Char<36>;
    return prisma.Workout.where({ id, userId }).delete();
  },
};
