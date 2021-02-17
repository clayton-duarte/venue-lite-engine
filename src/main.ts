import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';

import { EmptyResponseInterceptor } from './interceptors/empty-response.interceptor';
import { AppModule } from './app.module';

declare module 'express-session' {
  export interface SessionData {
    venueId: string;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setDescription('The API description')
    .setVersion('1.0')
    .setTitle('API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalInterceptors(new EmptyResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
    }),
  );

  await app.listen(3000);
}

bootstrap();
