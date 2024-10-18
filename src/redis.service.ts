import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';
import { UrlShortener } from './url-shortener/entities/url-shortener.entity';

@Injectable()
export class RedisService {

    private client: Redis.Redis;

    constructor() {
        this.client = new Redis.Redis({
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT, 10)
        });
    }

    async set(key: string, value: UrlShortener): Promise<void> {
        await this.client.set(key, JSON.stringify(value));
    }

    async get(key: string): Promise<UrlShortener | undefined> {
        try {
            let entityJson: UrlShortener = JSON.parse(await this.client.get(key));
            return entityJson;
        } catch (e) {
            if (e instanceof SyntaxError) {
                console.error(`Unexpected data in the database, the record has an invalid format.`);
                return undefined;
            }
        }
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