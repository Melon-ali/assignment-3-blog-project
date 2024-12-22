import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { StatusCodes } from 'http-status-codes';

const createUserIntoDB = async (payload: TUser) => {
  const newUser = await User.create(payload);
  if (!newUser) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');
  }
  return newUser;
};

// User Block

const blockUser = async (id: string, author: JwtPayload, payload: Partial<TUser> ) => {
  
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  if (author?.role !== 'admin') {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
  }
  await User.findByIdAndUpdate(id, payload, { new: true });
};

export const UserServices = {
  createUserIntoDB,
  blockUser,
};
