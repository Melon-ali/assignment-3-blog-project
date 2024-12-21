import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/users/user.interface';
import User from '../modules/users/user.model';

// Authorization middleware

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You Are Not Authorized!');
    }
    if (!token || !token.startsWith('Bearer ')) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You Are Not Authorized!');
    }
    const [, newtoken] = token.split(' ');

    const decoded = jwt.verify(
      newtoken,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, useremail } = decoded;

    const user = await User.isUserExistsByEmail(useremail);

    //if The User Doesn't Exits

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This User is Not Found !');
    }

    //if the user is Blocked
    if (user?.isBlocked) {
      throw new AppError(httpStatus.FORBIDDEN, 'This User is Blocked ! ');
    }
    //Authorized User or Admin Authorisation

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You Are Not Authorized  !');
    }
    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
