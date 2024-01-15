import express from 'express';
import { UsersController } from './user.controller';

const router = express.Router();

router.get('/', UsersController.getAllUsers);

export const usersRoutes = router;
