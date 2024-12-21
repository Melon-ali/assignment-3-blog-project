import express from 'express';
import { BlogValidtions } from './blog.validation';
import { BlogController } from './blog.controller';
import auth from '../../middlwares/auth';
import validateRequest from '../../middlwares/validateRequest';
const router = express.Router();

//Create Blog

router.post(
  '/',
  auth('user'),
  validateRequest(BlogValidtions.blogValidationSchema),
  BlogController.createBlog,
);

//Update Blog by User

router.patch(
  '/:id',
  auth('user'),
  validateRequest(BlogValidtions.IdValidationSchema),
  validateRequest(BlogValidtions.blogUpdateValidationSchema),
  BlogController.updateSingleBlog,
);

//Get Blog by User

router.delete(
  '/:id',
  auth('user'),
  validateRequest(BlogValidtions.IdValidationSchema),
  BlogController.deleteSingleBlog,
);

//Get All Blog it is public api

router.get('/', BlogController.getAllBlog);

export const BlogRoutes = router;
