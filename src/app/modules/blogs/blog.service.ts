import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import QueryBuilder from '../../builder/QueryBuilder';
import { blogsSearchableFields } from './blog.constant';

const getAllBlogs = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(
    Blog.find().populate('author', 'name email'),
    query,
  )
    .search(blogsSearchableFields)
    .authorFiltering()
    .filter()
    .sortBy()
    .sortOrder();
  const blogs = await blogQuery.modelQuery;
  return blogs;
};

const createBlogIntoDB = async (payload: IBlog, user: JwtPayload) => {
  const author = user?.userId;
  const blogData = { ...payload, author };

  const newBlog = await Blog.create(blogData);
  return newBlog;
};

const updateBlog = async (
  id: string,
  payload: Partial<IBlog>,
  author: JwtPayload,
) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  if (blog.author.toString() !== author?.userId.toString()) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to update this blog',
    );
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('author', 'name email');
  return updatedBlog;
};

const deleteBlog = async (id: string,
  author: JwtPayload,) => {
  
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  if (blog.author.toString() !== author?.userId.toString()) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to delete this blog',
    );
  }
  const deletedBlog = await Blog.findByIdAndDelete(id);
  return deletedBlog;
};

const deleteBlogByAdmin = async (id: string, author: JwtPayload) => {
  
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  if (author?.role !== 'admin') {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to delete this blog',
    );
  }
  await Blog.findByIdAndDelete(id);
};

export const BlogServices = {
  getAllBlogs,
  createBlogIntoDB,
  updateBlog,
  deleteBlog,
  deleteBlogByAdmin,
};
