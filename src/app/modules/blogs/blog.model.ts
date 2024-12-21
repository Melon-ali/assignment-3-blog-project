import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import { BlogModel, TBlog } from './blog.interface';
import { BlogHiddenfelds } from './blog.constant';
import AppError from '../../errors/AppError';

// Create BlogSchema

const blogSchema = new Schema<TBlog, BlogModel>(
  {
    title: {
      type: String,
      required: [true, 'The title field is required.'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'The content field is required.'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'The author field is required.'],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);


blogSchema.statics.isOwnUser = async function (email: string, id: string) {
  const user = await this.findById(id)
    .select('author')
    .populate<{ author: { email: string } }>('author', 'email -_id');

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, `Blog With id ${id} not found.`);
  }

  if (user && user.author && user.author.email === email) {
    return true;
  }
  return false;
};

//Remove Files

blogSchema.set('toJSON', {
  transform: function (doc, ret) {
    BlogHiddenfelds.forEach((field) => {
      delete ret[field];
    });
    return ret;
  },
});

// Create Blog Model

const Blog = model<TBlog, BlogModel>('Blog', blogSchema);

export default Blog;