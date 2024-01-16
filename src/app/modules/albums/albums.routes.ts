import express from 'express';
import { AlbumsController } from './albums.controller';
import auth from '../../middlewares/auth';
const router = express.Router();

// Routes
router.post('/', auth(), AlbumsController.createAlbum);

export const AlbumsRoutes = router;
