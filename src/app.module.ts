import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { MenuItemsModule } from './menu-items/menu-items.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuGroupsModule } from './menu-groups/menu-groups.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
    }),
    MongooseModule.forRoot(`${process.env.MONGO_URL}/${process.env.MONGO_DB}`),
    MenuItemsModule,
    UserModule,
    MenuGroupsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
