import { z } from 'zod';

export const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    content: z.string({ required_error: 'Content is required' }),
    author: z.string().optional(),
    isPublished: z.boolean().optional(),
  }),
});

export const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).optional(),
    content: z.string({ required_error: 'Content is required' }).optional(),
    author: z.string().optional(),
    isPublished: z.boolean().optional(),
  }),
});

export const BlogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};