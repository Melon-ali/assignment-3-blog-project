import { TUser } from './user.interface';
import User from './user.model';

//Create User Means Create User and Admin

const createuserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

export const UserServices = {
  createuserIntoDB,
};