import { Injectable, HttpException, HttpStatus, Session } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { SignInUserDto } from './dto/signin-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findOneByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  findOneById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async create(
    createUserDto: CreateUserDto,
    @Session() session: Request['session'],
  ) {
    const shouldRegisterEmail =
      (await this.findOneByEmail(createUserDto.email)) != null;

    if (shouldRegisterEmail) {
      throw new HttpException('Email already registered', HttpStatus.CONFLICT);
    }

    const createUser = new this.userModel(createUserDto);
    const registeredUser = await createUser.save();

    session.userId = registeredUser.id;
    return registeredUser.id;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const shouldUpdateEmail =
      updateUserDto.email != null &&
      (await this.findOneByEmail(updateUserDto.email)) != null;

    if (shouldUpdateEmail) {
      throw new HttpException('Email already registered', HttpStatus.CONFLICT);
    }

    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.userModel.findByIdAndRemove(id).exec();
  }

  async signIn(
    signInUserDto: SignInUserDto,
    @Session() session: Request['session'],
  ) {
    const registeredUser = await this.findOneByEmail(signInUserDto.email);

    if (registeredUser == null) {
      throw new HttpException('Email is not registered', HttpStatus.NOT_FOUND);
    }

    if (registeredUser.password !== signInUserDto.password) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    }

    session.userId = registeredUser.id;
    return registeredUser.id;
  }

  signOut(@Session() session: Request['session']) {
    return session.destroy((err) => {
      if (err != null) {
        throw new HttpException(
          JSON.stringify(err),
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }
    });
  }
}
