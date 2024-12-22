import { Model, Types } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUser = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  role: 'admin' | 'user';
  isBlocked: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;
  //Instance Methods for Checking if Passwords are Matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type IUserRole = keyof typeof USER_ROLE;
