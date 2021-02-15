import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { Venue, VenueSchema } from './schemas/venue.schema';
import { VenueController } from './venue.controller';
import { VenueService } from './venue.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Venue.name, schema: VenueSchema }]),
  ],
  controllers: [VenueController],
  providers: [VenueService],
})
export class VenueModule {}
