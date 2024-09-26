import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field((type) => String)
  @Prop()
  email: string;

  @Field((type) => String)
  @Prop()
  password: string;

  @Field((type) => String)
  @Prop()
  first_name: string;

  @Field((type) => String)
  @Prop()
  last_name: string;

  @Field((type) => String)
  @Prop()
  phone_number: string;

  @Field((type) => Boolean)
  @Prop({ default: false })
  is_email_verified: boolean;

  @Field((type) => Boolean)
  @Prop({ default: false })
  is_phone_verified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
