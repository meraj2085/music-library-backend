import express from 'express';
import { ArtistsController } from './artists.controller';
const router = express.Router();

// Routes
router.get('/', ArtistsController.getAllArtists);

export const ArtistsRoutes = router;
