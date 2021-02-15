import { Injectable, HttpException, HttpStatus, Session } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';

import { Venue, VenueDocument } from './schemas/venue.schema';
import { CompleteVenueDto } from './dto/complete-venue.dto';
import { SignInVenueDto } from './dto/signin-venue.dto';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';

@Injectable()
export class VenueService {
  constructor(
    @InjectModel(Venue.name) private venueModel: Model<VenueDocument>,
  ) {}

  findOneByEmail(email: string) {
    return this.venueModel.findOne({ email }).exec();
  }

  findOneById(id: string) {
    return this.venueModel.findById(id).exec();
  }

  async create(
    createVenueDto: CreateVenueDto,
    @Session() session: Request['session'],
  ) {
    const shouldRegisterEmail =
      (await this.findOneByEmail(createVenueDto.email)) != null;

    if (shouldRegisterEmail) {
      throw new HttpException('Email already registered', HttpStatus.CONFLICT);
    }

    const createVenue = new this.venueModel(createVenueDto);
    const registeredVenue = await createVenue.save();

    session.userId = registeredVenue.id;
    return registeredVenue;
  }

  async update(id: string, updateVenueDto: UpdateVenueDto) {
    const shouldUpdateEmail =
      updateVenueDto.email != null &&
      (await this.findOneByEmail(updateVenueDto.email)) != null;

    if (shouldUpdateEmail) {
      throw new HttpException('Email already registered', HttpStatus.CONFLICT);
    }

    return this.venueModel
      .findByIdAndUpdate(id, updateVenueDto, { new: true })
      .exec();
  }

  async onboard(id: string, completeVenueDto: CompleteVenueDto) {
    return this.update(id, completeVenueDto);
  }

  remove(id: string) {
    return this.venueModel.findByIdAndRemove(id).exec();
  }

  async signIn(
    signInVenueDto: SignInVenueDto,
    @Session() session: Request['session'],
  ) {
    const registeredVenue = await this.findOneByEmail(signInVenueDto.email);

    if (registeredVenue == null) {
      throw new HttpException('Email is not registered', HttpStatus.NOT_FOUND);
    }

    if (registeredVenue.password !== signInVenueDto.password) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    }

    session.userId = registeredVenue.id;
    return registeredVenue;
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
