import { db } from '../prisma/db.ts';
import type { Char } from '@prisma/orm-postgres/target/codec-types';
import type { CreateExercise } from '../types/exercise.type.ts';

const prisma = db.orm.public;

export const ExerciseModel = {
  findExerciseById: (data: { id: string }) => {
    const id = data.id as Char<36>;
    return prisma.Exercise.where({ id }).first();
  },
  getExercisesByWorkoutId: (data: { workoutId: string }) => {
    const workoutId = data.workoutId as Char<36>;
    return prisma.Exercise.where({ workoutId }).all();
  },
  create: (data: CreateExercise) => {
    const userId = data.userId as Char<36>;
    const workoutId = data.workoutId as Char<36>;
    const measurementUnitId = data.measurementUnitId as Char<36>;
    return prisma.Exercise.create({ ...data, userId, workoutId, measurementUnitId });
  },
  delete: (data: { id: string; userId: string }) => {
    const id = data.id as Char<36>;
    const userId = data.userId as Char<36>;
    return prisma.Exercise.where({ id, userId }).delete();
  },
};
