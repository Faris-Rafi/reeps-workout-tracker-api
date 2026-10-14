import type { AuthedRequest } from '../middlewares/authenticate.ts';
import { StatsService } from '../services/stats.service.ts';
import type { Response } from 'express';
import { status as httpStatus } from 'http-status';

const StatsController = {
  getStats: async (req: AuthedRequest, res: Response) => {
    const stats = await StatsService.getStats({ userId: req.user?.id || '' });
    res.status(httpStatus.OK).send({ ...stats });
  },
};

export default StatsController;
