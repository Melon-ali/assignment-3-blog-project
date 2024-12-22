import express from 'express';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../users/user.constant';
import { UserControllers } from '../users/user.controller';
import { BlogControllers } from '../blogs/blog.controller';

const router = express.Router();

// Block Route

router.patch(
  '/users/:id/block',
  auth(USER_ROLE.admin),
  UserControllers.blockUser,
);

// Delete Blog

router.delete(
  '/blogs/:id/',
  auth(USER_ROLE.admin),
  BlogControllers.deleteBlogByAdmin,
);

export const adminActionsRoutes = router;