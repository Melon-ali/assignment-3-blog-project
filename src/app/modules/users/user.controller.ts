import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';


//create user
const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createuserIntoDB(req.body);
  const { _id, name, email } = result;
  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: httpStatus.CREATED,
    data: { _id, name, email },
  });
});

export const UserController = {
  createUser,
};