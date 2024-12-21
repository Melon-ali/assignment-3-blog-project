import mongoose, { Schema } from 'mongoose';
import { TBlog } from './blog.interface';

const BlogSchema: Schema = new Schema<TBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Blog = mongoose.model<TBlog>('Blog', BlogSchema);
