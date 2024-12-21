import { Types } from 'mongoose';
import { z } from 'zod';

// Define Zod Validation For The Blog schema

export const blogValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: 'The Title is Required.' })
      .max(250, {
        message: 'The Title Must Be Less than or Equal to 250 Characters.',
      })
      .trim(),

    content: z
      .string()
      .min(1, { message: 'The Content is Required.' })
      .max(5000, {
        message: 'The Content Must Be less Than or Equal to 5000 Characters.',
      }),
  }),
});

// Define Zod validation for the Blog schema updated

const blogUpdateValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: 'The title field is required.' })
      .max(250, {
        message: 'The Title Must be Less than or Equal to 250 Characters.',
      })
      .trim()
      .optional(),

    content: z
      .string()
      .min(1, { message: 'The content field is required.' })
      .max(5000, {
        message: 'The Content Must Be Less Than or Equal to 5000 Characters.',
      })
      .optional(),
  }),
});

// Custom Zod Refinement for MongoDB ObjectId
const objectIdSchema = z
  .string()
  .refine((value) => Types.ObjectId.isValid(value), {
    message: 'Invalid MongoDB ObjectId',
  });

const IdValidationSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const BlogValidtions = {
  blogValidationSchema,
  blogUpdateValidationSchema,
  IdValidationSchema,
};
