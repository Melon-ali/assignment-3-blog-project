import { z } from "zod";

// Zod schema for Blog validation
export const createBlogValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  author: z.string().regex(/^[a-fA-F0-9]{24}$/, "Author must be a valid ObjectId"),
  isPublished: z.boolean().optional().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
