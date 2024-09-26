import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field((type) => String, { nullable: true })
  email: string;

  @Field((type) => String, { nullable: true })
  password: string;

  @Field((type) => String, { nullable: true })
  first_name: string;

  @Field((type) => String, { nullable: true })
  last_name: string;

  @Field((type) => String, { nullable: true })
  phone_number: string;
}
