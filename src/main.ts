import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';
import { UrlShortenerModule } from './url-shortener/url-shortener.module';

async function bootstrap() {
  const app = await NestFactory.create(UrlShortenerModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
