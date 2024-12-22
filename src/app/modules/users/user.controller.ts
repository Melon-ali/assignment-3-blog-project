import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import { StatusCodes } from 'http-status-codes';


const createUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await UserServices.createUserIntoDB(userData);
  const resultToSend = {
    _id: result._id,
    name: result.name,
    email: result.email,
  };

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User registered successfully',
    data: resultToSend,
  });
});

// User Block

const blockUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const userData = req.body;
  const user = req.user;
  await UserServices.blockUser(id, user, userData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User blocked successfully',
    data: null,
  });
});

export const UserControllers = {
  createUser,
  blockUser,
};
