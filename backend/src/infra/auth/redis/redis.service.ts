import { Inject, Injectable } from "@nestjs/common";
import { type RedisClientPoolType } from "redis";
import { Blacklist } from "src/domain/user/authentication/blacklist";

@Injectable()
export class RedisService implements Blacklist {
  constructor(
    @Inject("REDIS")
    private readonly redis: RedisClientPoolType
  ) {}
  
  async blacklistToken(token: string, expInSeconds: number): Promise<void> {
    await this.redis.set(`blacklist:${token}`, "1", { EX: expInSeconds });
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const exists = await this.redis.exists(`blacklist:${token}`);
    return Boolean(exists === 1);
  }
}
