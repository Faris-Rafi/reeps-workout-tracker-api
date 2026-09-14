import { Router } from 'express';
// eslint-disable-next-line import-x/no-rename-default
import AuthRoute from './auth.route.ts';

const router = Router();

const routes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
