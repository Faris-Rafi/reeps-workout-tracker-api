/* eslint-disable import-x/no-rename-default */
import { Router } from 'express';
import AuthRoute from './auth.route.ts';
import WorkoutRoute from './workout.route.ts';

const router = Router();

const routes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/workout',
    route: WorkoutRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
