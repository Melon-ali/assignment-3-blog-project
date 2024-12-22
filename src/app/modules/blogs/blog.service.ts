import httpStatus from 'http-status';
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

const createBlogIntoDB = async (payload: IBlog, token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const { userId } = decoded;

  const blogData = {
    ...payload,
    author: userId,
  };

  const newBlog = (await Blog.create(blogData)).populate(
    'author',
    'name email',
  );
  if (!newBlog) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Blog');
  }
  return newBlog;
};

const updateBlog = async (
  id: string,
  payload: Partial<IBlog>,
  token: string,
) => {
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;
  const { userId } = decoded;
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  if (blog.author.toString() !== userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not authorized to update this blog',
    );
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('author', 'name email');
  return updatedBlog;
};

const deleteBlog = async (id: string, token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;
  const { userId } = decoded;
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  if (blog.author.toString() !== userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not authorized to delete this blog',
    );
  }
  const deletedBlog = await Blog.findByIdAndDelete(id);
  return deletedBlog;
};
const deleteBlogByAdmin = async (id: string, token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;
  const { role } = decoded;
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  if (role !== 'admin') {
    throw new AppError(
      httpStatus.FORBIDDEN,
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