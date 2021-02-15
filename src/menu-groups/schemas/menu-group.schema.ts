import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { MenuItem } from '../../menu-items/schemas/menu-item.schema';

@Schema()
export class MenuGroup {
  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'MenuItem' }] })
  menuItems: MenuItem[];
}

export type MenuGroupDocument = MenuGroup & Document;

export const MenuGroupSchema = SchemaFactory.createForClass(MenuGroup);
