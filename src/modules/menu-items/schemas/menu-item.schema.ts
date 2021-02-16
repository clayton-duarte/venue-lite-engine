import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

import { Venue } from '../../venue/schemas/venue.schema';

@Schema()
export class MenuItem {
  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  price: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Venue', required: true })
  venueId: Venue;
}

export type MenuItemDocument = MenuItem & Document;

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);

MenuItemSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
