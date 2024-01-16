import express from 'express';
import { SongsController } from './songs.controller';
import auth from '../../middlewares/auth';
const router = express.Router();

// Routes
router.post('/', auth(), SongsController.createSong);

export const SongsRoutes = router;
