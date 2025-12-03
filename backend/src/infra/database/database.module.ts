import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Env } from "../env/env";
import { User, UserSchema } from "./mongoose/schemas/user.schema";
import {
  WeatherLog,
  WeatherLogSchema,
} from "./mongoose/schemas/weather-log.schema";
import { UsersRepository } from "src/domain/user/application/repositories/users.repository";
import { MongooseUsersRepository } from "./mongoose/repositories/mongoose-users.repository";
import { WeatherLogRepository } from "src/domain/weatherLog/application/repositories/weather-log.repository";
import { MongooseWeatherLogRepository } from "./mongoose/repositories/mongoose-weather-log.repository";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env, true>) => {
        const uri = configService.get("MONGO_URI", { infer: true });
        const dbName = configService.get("MONGO_DB");

        return {
          uri,
          dbName,
        };
      },
    }),
    MongooseModule.forFeature([
      // register the schemas here
      { name: User.name, schema: UserSchema },
      { name: WeatherLog.name, schema: WeatherLogSchema },
    ]),
  ],
  providers: [
    { provide: UsersRepository, useClass: MongooseUsersRepository },
    { provide: WeatherLogRepository, useClass: MongooseWeatherLogRepository },
  ],
  exports: [UsersRepository, WeatherLogRepository],
})
export class DatabaseModule {}
