import express from 'express';
const router = express.Router();

import { usersRoutes } from '../modules/users/users.routes';

const moduleRoutes = [
  {
    path: '/users',
    route: usersRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
