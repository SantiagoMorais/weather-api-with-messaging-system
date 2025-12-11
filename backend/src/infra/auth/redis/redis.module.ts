/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from "@nestjs/common";
import { createClient, RedisClientType } from "redis";
import { EnvService } from "src/infra/env/env.service";
import { RedisService } from "./redis.service";

@Module({
  providers: [
    {
      provide: "REDIS",
      inject: [EnvService],
      useFactory: async (env: EnvService): Promise<RedisClientType> => {
        const client: RedisClientType = createClient({
          url: env.get("REDIS_URL"),
        });

        await client.connect();

        return client;
      },
    },
    RedisService,
  ],
  exports: ["REDIS", RedisService],
})
export class RedisModule {}
