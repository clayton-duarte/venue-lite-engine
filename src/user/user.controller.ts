import {
  UseInterceptors,
  Controller,
  UseGuards,
  Delete,
  Post,
  Body,
  Put,
  Get,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { PasswordInterceptor } from './interceptors/password.interceptor';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { SessionGuard } from './guards/session.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(SessionGuard)
  @UseInterceptors(PasswordInterceptor)
  findOne(@Req() req: Request) {
    return this.userService.findOneById(req.session.userId);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
    return this.userService.create(createUserDto, req.session);
  }

  @Put()
  @UseGuards(SessionGuard)
  update(@Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    return this.userService.update(req.session.userId, updateUserDto);
  }

  @Delete()
  @UseGuards(SessionGuard)
  delete(@Req() req: Request) {
    return this.userService.delete(req.session.userId);
  }

  @Post('signin')
  signIn(@Body() signInUserDto: SignInUserDto, @Req() req: Request) {
    return this.userService.signIn(signInUserDto, req.session);
  }

  @Post('signout')
  signOut(@Req() req: Request) {
    return this.userService.signOut(req.session);
  }
}