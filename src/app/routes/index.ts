import express from 'express';
const router = express.Router();

import { ArtistsRoutes } from '../modules/artists/artists.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';

const moduleRoutes = [
  {
    path: '/artists',
    route: ArtistsRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
