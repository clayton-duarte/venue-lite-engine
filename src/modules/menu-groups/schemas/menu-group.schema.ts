import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

import { MenuItem } from '../../menu-items/schemas/menu-item.schema';
import { Venue } from '../../venue/schemas/venue.schema';

@Schema()
export class MenuGroup {
  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'MenuItem' }] })
  menuItems: MenuItem[];

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Venue' })
  venueId: Venue;
}

export type MenuGroupDocument = MenuGroup & Document;

export const MenuGroupSchema = SchemaFactory.createForClass(MenuGroup);

MenuGroupSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
