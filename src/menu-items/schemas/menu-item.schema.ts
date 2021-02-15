import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MenuItem {
  @Prop()
  label: string;

  @Prop()
  price: string;
}

export type MenuItemDocument = MenuItem & Document;

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);
