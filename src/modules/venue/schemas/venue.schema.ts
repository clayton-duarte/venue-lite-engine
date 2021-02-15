import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Venue {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  restaurantName: string;

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  provState: string;

  @Prop()
  postalZip: string;

  @Prop()
  country: string;

  @Prop()
  currency: string;

  @Prop()
  locale: string;

  @Prop()
  timeZone: string;
}

export type VenueDocument = Venue & Document;

export const VenueSchema = SchemaFactory.createForClass(Venue);
