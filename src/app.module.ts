import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { MenuGroupsModule } from './modules/menu-groups/menu-groups.module';
import { MenuItemsModule } from './modules/menu-items/menu-items.module';
import { VenueModule } from './modules/venue/venue.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
    }),
    MongooseModule.forRoot(`${process.env.MONGO_URL}/${process.env.MONGO_DB}`, {
      useFindAndModify: false,
    }),
    MenuGroupsModule,
    MenuItemsModule,
    VenueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
