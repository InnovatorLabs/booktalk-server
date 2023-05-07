import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type PostDocument = Post & Document;

const options: SchemaOptions = {
  timestamps: true,
  collection: 'post',
  _id: true,
};

@Schema(options)
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: false })
  book_image: string;

  @Prop({ required: false, default: 0 })
  like: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Comment' })
  comments: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
