import Joi from 'joi';

const loginJoiSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const signUpJoiSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const AuthValidation = {
  loginJoiSchema,
  signUpJoiSchema,
};
