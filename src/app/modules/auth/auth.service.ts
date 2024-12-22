import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import User from '../users/user.model';
import { TLogin } from './auth.interface';
import { createToken } from '../users/user.utils';
import config from '../../config';

//Create Token whit valide User

const loginUser = async (payload: TLogin) => {
  const user = await User.isUserExistsByEmail(payload.email);
  //if the user doesn't exits
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  //if the user is blocked
  if (user?.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! ');
  }

  //match passworld
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');

  const jwtPayload = {
    useremail: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return accessToken;
};

export const AuthServices = {
  loginUser,
};