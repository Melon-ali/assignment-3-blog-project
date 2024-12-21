import httpStatus from 'http-status';
import { TBlog } from './blog.interface';
import User from '../users/user.model';
import AppError from '../../errors/AppError';
import Blog from './blog.model';
import QueryBuilder from '../../builder/QueryBuilder';
import mongoose from 'mongoose';

//Create Blog Into The Database

const createBlogIntoDB = async (payload: Partial<TBlog>, userEmail: string) => {
  const user = await User.findOne({ email: userEmail }).select('_id');
  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'you are an authorised to create blog !',
    );
  }
  payload.author = user._id;
  const result = (await Blog.create(payload)).populate('author');
  return result;
};

//Update Blog Into The Database

const updateSingleBlogIntoDB = async (
  payload: Partial<TBlog>,
  id: string,
  userEmail: string,
) => {
  if (!id) {
    throw new Error(`Pleace Enter id`);
  }
  const isSameUser = await Blog.isOwnUser(userEmail, id);

  if (!isSameUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Your Are Not Authorize User');
  }

  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('author');

  return result;
};

//Delete Blog By User Into The Database

const deleteSingleBlogIntoDB = async (id: string, userEmail: string) => {
  if (!id) {
    throw new Error(`Pleace Enter id`);
  }

  const isSameUser = await Blog.isOwnUser(userEmail, id);

  if (!isSameUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Your Are Not Authorize User');
  }

  const result = await Blog.findByIdAndDelete(id);

  return result;
};

//Get All Blog From Databse

const getAllBlogFromDB = async (query: Record<string, unknown>) => {
  const Blogquery = new QueryBuilder(Blog.find().populate('author'), query)
    .search(['title', 'content'])
    .sort();

  let result = await Blogquery.modelQuery;

  if (query?.filter) {
    result = result.filter((item) =>
      item.author._id.equals(
        new mongoose.Types.ObjectId(query?.filter as string),
      ),
    );
  }

  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  updateSingleBlogIntoDB,
  deleteSingleBlogIntoDB,
  getAllBlogFromDB,
};
