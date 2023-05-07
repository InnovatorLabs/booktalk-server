import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Post } from '../../post/entities/post.entity';

export type UserDocument = User & Document;

const options: SchemaOptions = {
  timestamps: true,
  collection: 'user',
  _id: true,
};

@Schema(options)
export class User {
  @Prop({ required: true, defaultOptions: 'GENERAL' })
  type: string;

  @Prop({ required: false })
  uid: string;

  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: false })
  profile_image?: string;

  @Prop({ required: false })
  password?: string;

  @Prop({
    required: false,
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Post',
  })
  posts?: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);
