import express from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { BlogValidation } from './blog.validation';
import { BlogControllers } from './blog.controller';
import { USER_ROLE } from '../users/user.constant';
import auth from '../../middlwares/auth';

const router = express.Router();

// Create Blog

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogControllers.createBlog,
);

// Update Blog

router.patch(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(BlogValidation.updateBlogValidationSchema),
  BlogControllers.updateBlog,
);

// Delete Blog

router.delete(
  '/:id',
  auth(USER_ROLE.user),
  BlogControllers.deleteBlog,
);

// Get All Blogs

router.get('/', BlogControllers.getAllBlogs);

export const BlogRoutes = router;