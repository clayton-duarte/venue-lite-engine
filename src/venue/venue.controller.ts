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
import { CompleteVenueDto } from './dto/complete-venue.dto';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { SignInVenueDto } from './dto/signin-venue.dto';
import { VenueService } from './venue.service';
import { SessionGuard } from '../app.guard';

@Controller('venue')
@UseInterceptors(PasswordInterceptor)
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @Get()
  @UseGuards(SessionGuard)
  findOne(@Req() req: Request) {
    return this.venueService.findOneById(req.session.userId);
  }

  @Post()
  create(@Body() createVenueDto: CreateVenueDto, @Req() req: Request) {
    return this.venueService.create(createVenueDto, req.session);
  }

  @Put()
  @UseGuards(SessionGuard)
  update(@Body() updateVenueDto: UpdateVenueDto, @Req() req: Request) {
    return this.venueService.update(req.session.userId, updateVenueDto);
  }

  @Put('onboard')
  @UseGuards(SessionGuard)
  onboard(@Body() completeVenueDto: CompleteVenueDto, @Req() req: Request) {
    return this.venueService.onboard(req.session.userId, completeVenueDto);
  }

  @Delete()
  @UseGuards(SessionGuard)
  remove(@Req() req: Request) {
    return this.venueService.remove(req.session.userId);
  }

  @Post('signin')
  signIn(@Body() signInVenueDto: SignInVenueDto, @Req() req: Request) {
    return this.venueService.signIn(signInVenueDto, req.session);
  }

  @Post('signout')
  signOut(@Req() req: Request) {
    return this.venueService.signOut(req.session);
  }
}
