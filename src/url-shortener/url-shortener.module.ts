import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UrlShortenerService } from './url-shortener.service';
import { UrlShortenerController } from './url-shortener.controller';
import { RedisService } from 'src/redis.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [UrlShortenerController],
  providers: [RedisService, UrlShortenerService],
})
export class UrlShortenerModule { }
