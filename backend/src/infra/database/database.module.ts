import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersRepository } from "src/domain/user/application/repositories/users.repository";
import { CreateUserUseCase } from "src/domain/user/application/use-cases/create-user.usecase";
import { SeedAdminUserUseCase } from "src/domain/user/application/use-cases/seed-admin-user.usecase";
import { WeatherLogRepository } from "src/domain/weatherLog/application/repositories/weather-log.repository";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { Env } from "../env/env";
import { DatabaseSeederService } from "./mongoose/database-seeder.service";
import { MongooseUsersRepository } from "./mongoose/repositories/mongoose-users.repository";
import { MongooseWeatherLogRepository } from "./mongoose/repositories/mongoose-weather-log.repository";
import { User, UserSchema } from "./mongoose/schemas/user.schema";
import {
  WeatherLog,
  WeatherLogSchema,
} from "./mongoose/schemas/weather-log.schema";

@Module({
  imports: [
    CryptographyModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env, true>) => {
        const isTestAmbient =
          configService.get("NODE_ENV", { infer: true }) === "test";
        const uri = configService.get("MONGO_URI", { infer: true });
        const testUri = configService.get("MONGO_TEST_URI", { infer: true });

        return { uri: isTestAmbient ? testUri : uri };
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
    CreateUserUseCase,
    SeedAdminUserUseCase,
    DatabaseSeederService,
  ],
  exports: [UsersRepository, WeatherLogRepository],
})
export class DatabaseModule {}
