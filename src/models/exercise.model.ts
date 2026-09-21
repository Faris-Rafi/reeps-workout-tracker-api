import { db } from '../prisma/db.ts';
import type { Char } from '@prisma/orm-postgres/target/codec-types';

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
  // create: (data: CreateWorkout) => {
  //   const userId = data.userId as Char<36>;
  //   const bgColor = data.bgColor as unknown as JsonValue;
  //   return prisma.Workout.create({ ...data, userId, bgColor });
  // },
  // delete: (data: { id: string; userId: string }) => {
  //   const id = data.id as Char<36>;
  //   const userId = data.userId as Char<36>;
  //   return prisma.Workout.where({ id, userId }).delete();
  // },
};
