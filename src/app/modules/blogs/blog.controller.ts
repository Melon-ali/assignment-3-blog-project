import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { BlogServices } from './blog.service';
import { StatusCodes } from 'http-status-codes';

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogs(req.query);
  const resultToSend = result.map((blog) => ({
    _id: blog._id,
    title: blog.title,
    content: blog.content,
    author: blog.author,
  }));
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blogs fetched successfully',
    data: resultToSend,
  });
});

const createBlog = catchAsync(async (req, res) => {
  const user = req.user;
  const blogData = req.body;
  const result = await BlogServices.createBlogIntoDB(blogData, user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog  Create successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  const user = req.user;

  const blogData = req.body;
  const result = await BlogServices.updateBlog(id, blogData, user);
  const resultToSend = {
    _id: result?._id,
    title: result?.title,
    content: result?.content,
    author: result?.author,
  };
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog updated successfully',
    data: resultToSend,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  
  await BlogServices.deleteBlog(id, user);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog deleted successfully',
    data: null,
  });
});

const deleteBlogByAdmin = catchAsync(async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  await BlogServices.deleteBlogByAdmin(id, user);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog Deleted Successfully',
    data: null,
  });
});

export const BlogControllers = {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  deleteBlogByAdmin,
};
