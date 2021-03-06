import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { MenuItem, MenuItemSchema } from './schemas/menu-item.schema';
import { MenuItemsController } from './menu-items.controller';
import { MenuItemsService } from './menu-items.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MenuItem.name, schema: MenuItemSchema },
    ]),
  ],
  controllers: [MenuItemsController],
  providers: [MenuItemsService],
})
export class MenuItemsModule {}
