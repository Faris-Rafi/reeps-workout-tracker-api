import { Router } from 'express';
import authenticate from '../../middlewares/authenticate.ts';
import { apiLimiter } from '../../middlewares/rateLimiter.ts';
import StatsController from '../../controllers/stats.controller.ts';

const router = Router();

router.use(apiLimiter);
router.get('/', authenticate, StatsController.getStats);

export default router;
