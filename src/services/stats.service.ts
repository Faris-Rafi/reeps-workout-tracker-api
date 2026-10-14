import { SessionModel } from '../models/session.model.ts';

export const StatsService = {
  getStats: async (data: { userId: string }) => {
    const thisMonthTotalSession = await SessionModel.thisMonthSessions({
      userId: data.userId,
      type: 'count',
    });

    const sessionsPerWeek = await SessionModel.getSessionsPerWeekStats({
      userId: data.userId,
      weekCount: 12,
    });

    return { ...thisMonthTotalSession, ...sessionsPerWeek };
  },
};
