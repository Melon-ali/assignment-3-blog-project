import { z } from 'zod';
import { roletype } from './user.constant';

// Define Zod validation for the user schema

const userchmeavalidations = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'The Name is Required.',
      })
      .trim()
      .min(1, 'The Name is Required.'),
    email: z
      .string({
        required_error: 'The Email is Required.',
      })
      .email('Please Provide a Valid Email Address!'),
    password: z
      .string({
        required_error: 'The Password is required.',
      })
      .min(6, 'Password Must Be at Least 6 Characters Long.'),
    role: z
      .enum([...roletype] as [string, ...string[]], {
        invalid_type_error: "Role Must be 'admin' or 'user'.",
      })
      .default('user'),
  }),
});

export const UserValidtions = {
  userchmeavalidations,
};