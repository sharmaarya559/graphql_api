import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Otp {
  @Field((type) => String)
  @Prop()
  type: string;

  @Field((type) => String)
  @Prop()
  action: string;

  @Field((type) => Number)
  @Prop()
  otp: number;

  @Field((type) => String)
  @Prop()
  email: string;

  @Field((type) => String)
  @Prop()
  phone_number: string;

  @Field((type) => Date)
  @Prop()
  expiredAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
export type OtpDocument = Otp & Document;
