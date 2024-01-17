import express from 'express';
import { AlbumsController } from './albums.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AlbumValidation } from './album.validation';
const router = express.Router();

// Routes
router.get('/:id', auth(), AlbumsController.getSingleAlbum);

router.patch(
  '/:id',
  auth(),
  validateRequest(AlbumValidation.updateAlbumJoiSchema),
  AlbumsController.updateAlbum
);

router.delete('/:id', auth(), AlbumsController.deleteAlbum);

router.get('/', auth(), AlbumsController.getAllAlbum);

router.post(
  '/',
  auth(),
  validateRequest(AlbumValidation.addAlbumJoiSchema),
  AlbumsController.createAlbum
);

export const AlbumsRoutes = router;
