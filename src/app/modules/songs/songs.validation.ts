import Joi from 'joi';

const addSongJoiSchema = Joi.object({
  title: Joi.string().required(),
  duration: Joi.string().required(),
  album_id: Joi.number().required(),
});

const updateSongJoiSchema = Joi.object({
  title: Joi.string(),
  duration: Joi.string(),
});

export const SongsValidation = {
  addSongJoiSchema,
  updateSongJoiSchema,
};
