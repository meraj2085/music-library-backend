import Joi from 'joi';

const addAlbumJoiSchema = Joi.object({
  title: Joi.string().required(),
  release_year: Joi.string().required(),
  genre: Joi.string().required(),
});

const updateAlbumJoiSchema = Joi.object({
  title: Joi.string(),
  release_year: Joi.string(),
  genre: Joi.string(),
});

const addArtistToAlbum = Joi.object({
  artistId: Joi.number().required(),
  albumId: Joi.number().required(),
});

export const AlbumValidation = {
  updateAlbumJoiSchema,
  addAlbumJoiSchema,
  addArtistToAlbum,
};
