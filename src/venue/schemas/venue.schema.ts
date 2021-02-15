import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Venue {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  name = '';
}

export type VenueDocument = Venue & Document;

export const VenueSchema = SchemaFactory.createForClass(Venue);
