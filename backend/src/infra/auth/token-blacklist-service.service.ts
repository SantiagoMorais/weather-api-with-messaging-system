import { Injectable, Inject } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable()
export class TokenBlacklistService {
  constructor(@Inject("REDIS_CLIENT") private readonly redis: Redis) {}

  async blacklistToken(token: string, expiresInSeconds: number): Promise<void> {
    await this.redis.set(token, "invalidated", "EX", expiresInSeconds);
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const isBlacklisted = await this.redis.get(token);
    return !!isBlacklisted;
  }
}
