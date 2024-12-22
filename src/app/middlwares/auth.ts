import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import { IUserRole } from '../modules/users/user.interface';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import { StatusCodes } from 'http-status-codes';
import { User } from '../modules/users/user.model';

const auth = (...requiredRoles: IUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization?.split(' ')[1];

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    }

    let decoded: JwtPayload | null = null;

    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (err) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid or expired token!');
    }

    const { userId } = decoded;
    console.log(decoded);

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User Not Found!');
    }

    const isBlocked = user?.isBlocked;

    if (isBlocked) {
      throw new AppError(StatusCodes.FORBIDDEN, 'Your Account is Blocked!');
    }

    req.user = decoded;

    if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        'You do not have the required permissions!',
      );
    }

    next();
  });
};

export default auth;
