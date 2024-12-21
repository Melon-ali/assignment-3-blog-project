import { Model, Types } from 'mongoose';

// Create Interface For Blog

export type TBlog = {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished: boolean;
};

export interface BlogModel extends Model<TBlog> {
  isOwnUser(email: string, id: string): Promise<boolean>;
}