import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { VerifyUserInput } from './dto/verifyuser.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => String)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => String)
  async verifyUser(@Args('verifyUserInput') verifyUserInput: VerifyUserInput) {
    return this.userService.verifyUser(verifyUserInput);
  }

  @Query(() => [User])
  async findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Query(() => User)
  async findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  async updateUser(@Args('id') id:string,@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => String)
  async removeUser(@Args('id') id: string) {
    return this.userService.remove(id);
  }
}
