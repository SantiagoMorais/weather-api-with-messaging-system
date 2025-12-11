import { Inject, Injectable } from "@nestjs/common";
import { type RedisClientPoolType } from "redis";

@Injectable()
export class RedisService {
  constructor(
    @Inject("REDIS")
    private readonly redis: RedisClientPoolType
  ) {}

  async blackListToken(token: string, expInSeconds: number) {
    await this.redis.set(`blacklist:${token}`, "1", { EX: expInSeconds });
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const exists = await this.redis.exists(`blacklist:${token}`);
    return Boolean(exists === 1);
  }
}
