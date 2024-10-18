import { Injectable } from '@nestjs/common';
import { CreateUrlShortenerDto } from './dto/create-url-shortener.dto';
import { UpdateUrlShortenerDto } from './dto/update-url-shortener.dto';
import { RedisService } from 'src/redis.service';
import ShortUniqueId from 'short-unique-id';
import { UrlShortener } from './entities/url-shortener.entity';
import { UrlShortError } from 'src/urlshort.error';

@Injectable()
export class UrlShortenerService {

  private readonly SHORT_DOMAIN: URL = new URL(process.env.SHORT_DOMAIN);

  constructor(private readonly redisService: RedisService) { }

  async create(createUrlShortenerDto: CreateUrlShortenerDto): Promise<UrlShortener> {
    let entity: UrlShortener = this.toEntity(createUrlShortenerDto);
    let keys = this.buildUrlShortAndId();

    entity.id = keys.id;
    entity.urlShort = keys.url;
    entity.count = 0;

    let x = await this.redisService.set(keys.id, entity);
    return entity;

  }

  async findAll() {
    return this.redisService.getAllKeys();
  }

  async findOne(id: string) {
    return this.redisService.get(id);
  }

  async update(id: string, updateUrlShortenerDto: UpdateUrlShortenerDto) {
    let updateEntity: UrlShortener = this.toEntity(updateUrlShortenerDto);
    let currentEntity: UrlShortener = await this.findOne(id);
    if (!currentEntity)
      throw new UrlShortError(`The requested url is not found`);

    currentEntity.url = updateEntity.url;
    currentEntity.owner = updateEntity.owner;
    currentEntity.status = updateEntity.status;
    currentEntity.updatedAt = new Date();
    await this.redisService.update(id, currentEntity);

    return currentEntity;
  }

  async remove(id: string) {
    return await this.redisService.delete(id);
  }

  async countLink(urlShort: URL): Promise<URL> {
    let urlRedirect: URL = new URL(urlShort);
    let id: string = urlRedirect.pathname.slice(1);
    let urlShortener: UrlShortener = await this.findOne(id);
    if (!urlShortener)
      throw new UrlShortError(`URL not found!`);
    else if (urlShortener.status == 'DISABLED')
      throw new UrlShortError(`URL is disabled!`);

    urlShortener.count++;
    this.redisService.set(id, urlShortener);
    return urlShortener.url;
  }

  private toEntity(createUrlShortenerDto: any): UrlShortener {
    return Object.assign(new UrlShortener(), createUrlShortenerDto);
  }

  private buildUrlShortAndId(): { url: URL, id: string } {
    let uid: string = (new ShortUniqueId({ length: 7 })).rnd();
    this.SHORT_DOMAIN.pathname = uid;
    return { url: this.SHORT_DOMAIN, id: uid };
  }

}
