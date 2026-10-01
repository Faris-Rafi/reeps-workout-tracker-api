import { db } from '../prisma/db.ts';
import type { Char } from '@prisma/orm-postgres/target/codec-types';
import type { CreateWorkoutSession, UpdateWorkoutSession } from '../types/workout.type.ts';
import moment from 'moment';

const prisma = db.orm.public;

export const WorkoutSessionModel = {
  thisMonthSessions: async (data: { userId: string }) => {
    const today = Temporal.Now.plainDateISO('UTC');
    const monthStart = today.with({ day: 1 }).toPlainDateTime();
    const nextMonthStart = monthStart.add({ months: 1 });

    return prisma.WorkoutSession.where((session) => session.userId.eq(data.userId as Char<36>))
      .where((session) => session.startedAt.gte(monthStart))
      .where((session) => session.startedAt.lt(nextMonthStart))
      .all();
  },
  create: (data: CreateWorkoutSession) => {
    const userId = data.userId as Char<36>;
    const workoutId = data.workoutId as Char<36>;
    const startedAt = Temporal.PlainDateTime.from(moment().toISOString());
    return prisma.WorkoutSession.create({ userId, workoutId, startedAt });
  },
  update: (data: UpdateWorkoutSession) => {
    const userId = data.userId as Char<36>;
    const workoutId = data.workoutId as Char<36>;
    const endedAt = Temporal.PlainDateTime.from(moment().toISOString());
    return prisma.WorkoutSession.where({ userId, workoutId }).update({
      exerciseCount: data.exerciseCount,
      setCount: data.setCount,
      volume: data.volume,
      endedAt,
    });
  },
};
