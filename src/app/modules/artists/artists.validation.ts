import Joi from 'joi';

const updateArtistsJoiSchema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
});

export const ArtistsValidation = {
  updateArtistsJoiSchema,
};
