import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class VerifyUserInput {
  @Field((type) => String)
  email: string;

  @Field((type) => String)
  type: string;

  @Field((type) => String)
  action: string;

  @Field((type) => Number)
  otp: number;
}
