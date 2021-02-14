import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // TODO > remove
  findAll() {
    return this.userModel.find().exec();
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  findOneById(id: string) {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async create(createUserDto: CreateUserDto) {
    if ((await this.findOneByEmail(createUserDto.email)) != null) {
      throw new HttpException('Email already registered', HttpStatus.CONFLICT);
    } else {
      const createUser = new this.userModel(createUserDto);
      return createUser.save();
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ _id: id }, updateUserDto).exec();
  }

  delete(id: string) {
    return this.userModel.deleteOne({ _id: id }).exec();
  }
}
