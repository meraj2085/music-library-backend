import express from 'express';
const router = express.Router();

import { ArtistsRoutes } from '../modules/artists/artists.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { AlbumsRoutes } from '../modules/albums/albums.routes';

const moduleRoutes = [
  {
    path: '/artists',
    route: ArtistsRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/albums',
    route: AlbumsRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
