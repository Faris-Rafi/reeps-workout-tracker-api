import { db } from '../prisma/db.ts';
import type { Char } from '@prisma/orm-postgres/target/codec-types';
import type { CreateWorkoutSession, UpdateWorkoutSession } from '../types/workout.type.ts';
import moment from 'moment';

const prisma = db.orm.public;

export const SessionModel = {
  thisMonthSessions: async (data: { userId: string; type?: 'all' | 'count' }) => {
    const today = Temporal.Now.plainDateISO('UTC');
    const monthStart = today.with({ day: 1 }).toPlainDateTime();
    const nextMonthStart = monthStart.add({ months: 1 });

    if (data.type === 'count') {
      const sessions = await prisma.WorkoutSession.where((session) =>
        session.userId.eq(data.userId as Char<36>)
      )
        .where((session) => session.startedAt.gte(monthStart))
        .where((session) => session.startedAt.lt(nextMonthStart))
        .aggregate((a) => ({
          total: a.count(),
          exerciseCount: a.sum('exerciseCount'),
          volume: a.sum('volume'),
        }));

      return {
        thisMonth: sessions.total,
        exerciseCount: sessions.exerciseCount ?? 0,
        volumeCount: sessions.volume ?? 0,
      };
    }

    return prisma.WorkoutSession.where((session) => session.userId.eq(data.userId as Char<36>))
      .where((session) => session.startedAt.gte(monthStart))
      .where((session) => session.startedAt.lt(nextMonthStart))
      .all();
  },
  thisWeekSessions: async (data: { userId: string }) => {
    const today = Temporal.Now.plainDateISO('UTC');
    const weekStart = today.subtract({ days: today.dayOfWeek }).toPlainDateTime();
    const nextWeekStart = weekStart.add({ weeks: 1 });

    return prisma.WorkoutSession.where((session) => session.userId.eq(data.userId as Char<36>))
      .where((session) => session.startedAt.gte(weekStart))
      .where((session) => session.startedAt.lt(nextWeekStart))
      .all();
  },
  create: (data: CreateWorkoutSession) => {
    const userId = data.userId as Char<36>;
    const workoutId = data.workoutId as Char<36>;
    const startedAt = Temporal.PlainDateTime.from(moment().format());
    return prisma.WorkoutSession.create({ userId, workoutId, startedAt });
  },
  update: (data: UpdateWorkoutSession) => {
    const sessionId = data.sessionId as Char<36>;
    const endedAt = Temporal.PlainDateTime.from(moment().format());
    return prisma.WorkoutSession.where({ id: sessionId }).update({
      exerciseCount: data.exerciseCount,
      setCount: data.setCount,
      volume: data.volume,
      endedAt,
    });
  },
  getSessionsPerWeekStats: async (data: { weekCount: number; userId: string }) => {
    const today = Temporal.Now.plainDateISO('UTC');
    const weekStart = today.subtract({ days: today.dayOfWeek }).toPlainDateTime();
    const startDate = weekStart.subtract({ weeks: data.weekCount }).toString();

    const plan = db.raw.sql`
      WITH weeks AS (
        SELECT generate_series(
          ${startDate}::timestamp,
          ${weekStart.toString()}::timestamp,
          interval '1 week'
        ) AS week_start
      )
      SELECT
        w.week_start::date AS week_start,
        (w.week_start + interval '6 days')::date AS week_end,
        COUNT(s."id") AS total_sessions
      FROM weeks w
      LEFT JOIN "WorkoutSession" s 
        ON s."userId" = ${data.userId} 
        AND s."startedAt" >= w.week_start 
        AND s."startedAt" < (w.week_start + interval '1 week')
      GROUP BY w.week_start
      ORDER BY w.week_start
    `
      .returnsRow({
        week_start: 'pg/text@1',
        week_end: 'pg/text@1',
        total_sessions: 'pg/int4@1',
      })
      .build();

    const sessions = await db.runtime().query(plan);
    const averagePerWeek =
      sessions.reduce((sum, row) => sum + row.total_sessions, 0) / sessions.length;
    const bestWeek = sessions.reduce<(typeof sessions)[number] | undefined>(
      (best, row) => (!best || row.total_sessions > best.total_sessions ? row : best),
      undefined
    );

    return { sessions, averagePerWeek: averagePerWeek.toFixed(1), bestWeek };
  },
};
