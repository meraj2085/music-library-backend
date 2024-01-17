import express from 'express';
import { SongsController } from './songs.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SongsValidation } from './songs.validation';
const router = express.Router();

// Routes
router.get('/:id', auth(), SongsController.getSingleSong);

router.delete('/:id', auth(), SongsController.deleteSong);

router.patch(
  '/:id',
  auth(),
  validateRequest(SongsValidation.updateSongJoiSchema),
  SongsController.updateSong
);

router.post(
  '/',
  auth(),
  validateRequest(SongsValidation.addSongJoiSchema),
  SongsController.createSong
);

router.get('/', auth(), SongsController.getSongs);

export const SongsRoutes = router;
