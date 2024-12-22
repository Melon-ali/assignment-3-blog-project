import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

const createUserIntoDB = async (payload: TUser) => {
  const newUser = await User.create(payload);
  if (!newUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
  }
  return newUser;
};

// User Block

const blockUser = async (id: string, token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;
  const { role } = decoded;
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (role !== 'admin') {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }
  await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
};

export const UserServices = {
  createUserIntoDB,
  blockUser,
};
