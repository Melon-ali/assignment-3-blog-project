import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Id is Required.' })
      .email({ message: 'Invalid Email Address' }),
    password: z.string({ required_error: 'Password is Required' }),
  }),
});



export const AuthValidation = {
  loginValidationSchema,
};