import { ObjectType, Field, Int } from '@nestjs/graphql';
import mongoose from 'mongoose';

@ObjectType()
export class User {
  @Field((type) => String,{nullable:true})
  _id: mongoose.Types.ObjectId;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  password: string;

  @Field((type) => String, { nullable: true })
  first_name: string;

  @Field((type) => String, { nullable: true })
  last_name: string;

  @Field((type) => String, { nullable: true })
  phone_number: string;
}
