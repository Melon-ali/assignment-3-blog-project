import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import { emailValidationRegex, roletype } from './user.constant';
import config from '../../config';

//create useshema
const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, 'The Name Field is Required.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'The Email Field is Required.'],
      unique: true,
      validate: {
        validator: function (value: string) {
          return emailValidationRegex.test(value);
        },
        message: 'Please Provide a Valid Email Address.',
      },
    },
    password: {
      type: String,
      required: [true, 'The Password Field is Required.'],
      minlength: [6, 'Password Must Be at Least 6 Characters long.'],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: roletype,
        message: "Role Must Be Rather 'admin' or 'user'.",
      },
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//Plant Passworld convert to has Passworld
userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
});

//Instance Methods for Checking if Passwords are Matched

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

//Instance Methods for Checking if The User Exist
userSchema.statics.isUserExistsByEmail = async function (email) {
  return await User.findOne({ email }).select('+password');
};

//Create User Model
const User = model<TUser, UserModel>('User', userSchema);

export default User;