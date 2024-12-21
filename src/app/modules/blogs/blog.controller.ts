import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import sendRequestData from '../../utils/sendRequestWithMongooseData';

//create blog with user id
const createBlog = catchAsync(async (req: Request, res: Response) => {
  const { userEmail } = req.user as JwtPayload;
  const result = await BlogServices.createBlogIntoDB(req.body, userEmail);
  sendResponse(res, {
    success: true,
    message: 'Blog Created Successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

//Update Blog With Token and Info

const updateSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userEmail } = req.user as JwtPayload;
  const result = await BlogServices.updateSingleBlogIntoDB(
    req.body,
    id,
    userEmail,
  );
  sendResponse(res, {
    success: true,
    message: 'Blog Updated Successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

//Deleted Blog by User

const deleteSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userEmail } = req.user as JwtPayload;
  await BlogServices.deleteSingleBlogIntoDB(id, userEmail);

  sendRequestData(res, {
    success: true,
    message: 'Blog Deleted Successfully',
    statusCode: httpStatus.OK,
  });
});

//Get All Block for Public Api

const getAllBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getAllBlogFromDB(req.query);
  sendResponse(res, {
    success: true,
    message: 'Blogs fetched successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

export const BlogController = {
  createBlog,
  updateSingleBlog,
  deleteSingleBlog,
  getAllBlog,
};
