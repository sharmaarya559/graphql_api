import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
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
