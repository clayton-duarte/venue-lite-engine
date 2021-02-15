import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { MenuGroup, MenuGroupSchema } from './schemas/menu-group.schema';
import { MenuGroupsController } from './menu-groups.controller';
import { MenuGroupsService } from './menu-groups.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MenuGroup.name, schema: MenuGroupSchema },
    ]),
  ],
  controllers: [MenuGroupsController],
  providers: [MenuGroupsService],
})
export class MenuGroupsModule {}
