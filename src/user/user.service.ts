import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Otp, OtpDocument } from './schema/otp.schema';
import { VerifyUserInput } from './dto/verifyuser.input';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Otp.name) private readonly otpModel: Model<OtpDocument>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    try {
      const findUser = await this.userModel.findOne({
        email: createUserInput.email,
      });
      if (findUser) {
        return 'User already exist';
      }
      const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
      createUserInput.password = hashedPassword;
      await new this.userModel(createUserInput).save();
      await new this.otpModel({
        type: 'email',
        action: 'verify_email',
        email: createUserInput.email,
        otp: 1234,
        expiredAt: new Date(Date.now() + 2 * 60 * 1000),
      }).save();
      return 'User created successfully otp sent on your email';
    } catch (error) {
      return error.message;
    }
  }

  async verifyUser(verifyUserInput: VerifyUserInput) {
    try {
      const findOtp = await this.otpModel.findOne({
        email: verifyUserInput.email,
        type: verifyUserInput.type,
        expiredAt: { $gte: Date.now() },
        action: verifyUserInput.action,
      });
      if (!findOtp) {
        return 'Otp not found';
      }
      if (findOtp.otp !== verifyUserInput.otp) {
        return 'Wrong otp entered';
      }
      await this.otpModel.deleteOne({ _id: findOtp._id });
      await this.userModel.findOneAndUpdate(
        { email: verifyUserInput.email },
        { is_email_verified: true },
      );
      return `${verifyUserInput.type} verified successfully`;
    } catch (error) {
      return error.message;
    }
  }

  async findAllUsers() {
    const users = await this.userModel.find();
    return users;
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserInput, {
      new: true,
    });
    return user;
  }

  async remove(id: string) {
    await this.userModel.findByIdAndDelete(id);
    return 'User deleted successfully';
  }
}
