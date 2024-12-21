import express from 'express';
import { UserController } from './user.controller';
import { UserValidtions } from './user.validation';
import validateRequest from '../../middlwares/validateRequest';

const router = express.Router();
//create user
router.post(
  '/register',
  validateRequest(UserValidtions.userchmeavalidations),
  UserController.createUser
);

export const UserRoutes = router;