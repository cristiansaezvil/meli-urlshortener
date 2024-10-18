import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';
import { UrlShortener } from './url-shortener/entities/url-shortener.entity';
import { UrlShortError } from './urlshort.error';

@Injectable()
export class RedisService {

    private client: Redis.Redis;

    constructor() {
        this.client = new Redis.Redis({
            host: 'localhost',
            port: 6379
        });
    }

    async set(key: string, value: UrlShortener): Promise<void> {
        value.createdAt = new Date();
        value.updatedAt = value.createdAt;
        await this.client.set(key, JSON.stringify(value));
    }

    async get(key: string): Promise<UrlShortener | undefined> {
        let entityJson: string = await this.client.get(key);
        return JSON.parse(entityJson);
    }

    async delete(key: string): Promise<void> {
        await this.client.del(key);
    }

    async update(id: string, value: UrlShortener): Promise<UrlShortener> {
        await this.client.set(id, JSON.stringify(value));
        return value;
    }

    async getAllKeys(): Promise<any> {
        let [cursor, elements] = await this.client.scan(0);
        return elements;
    }
}