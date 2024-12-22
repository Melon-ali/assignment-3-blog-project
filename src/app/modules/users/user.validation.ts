import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is Required' })
      .refine((value) => /^[A-Z]/.test(value), {
        message: 'Name Must Start With a Capital Letter',
      }),
    email: z
      .string({ required_error: 'Email is Required' })
      .email({ message: 'Invalid Email Address' }),
    password: z
      .string({
        required_error: 'Password is Required',
        invalid_type_error: 'Password Must be string',
      })
      .min(6, { message: 'Password must Be At Least 6 Characters Long' }),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
};