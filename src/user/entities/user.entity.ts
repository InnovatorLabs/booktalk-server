import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';

export type UserDocument = User & Document;

const options: SchemaOptions = {
  timestamps: true,
  collection: 'user',
  _id: true,
};

@Schema(options)
export class User {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  uid: string;

  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  profile_image: string;

  @Prop()
  password?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
