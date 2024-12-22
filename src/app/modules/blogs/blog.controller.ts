import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { BlogServices } from './blog.service';

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogs(req.query);
  const resultToSend = result.map((blog) => ({
    _id: blog._id,
    title: blog.title,
    content: blog.content,
    author: blog.author,
  }));
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs fetched successfully',
    data: resultToSend,
  });
});

const createBlog = catchAsync(async (req, res) => {
  let token = req.headers.authorization;
  token = token?.includes('Bearer') ? token?.replace(/^Bearer\s+/, '') : token;
  const blogData = req.body;
  const result = await BlogServices.createBlogIntoDB(blogData, token as string);
  const resultToSend = {
    _id: result._id,
    title: result.title,
    content: result.content,
    author: result.author,
  };

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: resultToSend,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  let token = req.headers.authorization;
  token = token?.includes('Bearer') ? token?.replace(/^Bearer\s+/, '') : token;
  const blogData = req.body;
  const result = await BlogServices.updateBlog(id, blogData, token as string);
  const resultToSend = {
    _id: result?._id,
    title: result?.title,
    content: result?.content,
    author: result?.author,
  };
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully',
    data: resultToSend,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  let token = req.headers.authorization;
  token = token?.includes('Bearer') ? token?.replace(/^Bearer\s+/, '') : token;
  await BlogServices.deleteBlog(id, token as string);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog deleted successfully',
      data: null
  });
});

const deleteBlogByAdmin = catchAsync(async (req, res) => {
  const id = req.params.id;
  let token = req.headers.authorization;
  token = token?.includes('Bearer') ? token?.replace(/^Bearer\s+/, '') : token;
  await BlogServices.deleteBlogByAdmin(id, token as string);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog Deleted Successfully',
      data: null
  });
});

export const BlogControllers = {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  deleteBlogByAdmin,
};