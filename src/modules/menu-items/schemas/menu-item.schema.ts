import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MenuItem {
  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  price: string;
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
