import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
const router = express.Router();

// Routes
router.post(
  '/login',
  validateRequest(AuthValidation.loginJoiSchema),
  AuthController.login
);

router.post(
  '/signup',
  validateRequest(AuthValidation.signUpJoiSchema),
  AuthController.signUp
);

router.post('/refresh-token', AuthController.refreshToken);

export const AuthRoutes = router;
