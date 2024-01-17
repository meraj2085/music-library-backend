import express from 'express';
import { ArtistsController } from './artists.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ArtistsValidation } from './artists.validation';
const router = express.Router();

// Routes
router.get('/', auth(), ArtistsController.getAllArtists);

router.get('/:id', auth(), ArtistsController.getSingleArtist);

router.patch(
  '/',
  auth(),
  validateRequest(ArtistsValidation.updateArtistsJoiSchema),
  ArtistsController.updateArtist
);

export const ArtistsRoutes = router;
