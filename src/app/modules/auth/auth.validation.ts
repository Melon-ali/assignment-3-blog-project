import { z } from 'zod';

// Define Zod Validation

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email('Please Provide a Valid Email Address.')
      .min(1, { message: 'The Email is required' }),

    password: z
      .string()
      .min(6, { message: 'Password Must be at Least 6 Characters Long.' }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
};