import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../users/user.model';
import { TLogin } from './auth.interface';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLogin) => {
  // Checking if The User is Exist

  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // Checking if The User is Blocked

  const userStatus = user?.isBlocked;

  if (userStatus) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
  }

  //Checking if The Password is Correct

  const checkPassword = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );

  if (!checkPassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  //Create Token and Sent to The  Client

  const jwtPayload = {
    userId: user._id,
    role: user.role,
    email: user.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};


export const AuthServices = {
  loginUser,
};