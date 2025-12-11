import { Module } from "@nestjs/common";
import { CreateUserUseCase } from "src/domain/user/application/use-cases/create-user.usecase";
import { CryptographyModule } from "src/infra/cryptography/cryptography.module";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateUserController } from "./models/controllers/create-user.controller";
import { AuthenticateUserController } from "./models/controllers/authenticate-user.controller";
import { AuthenticateUserUseCase } from "src/domain/user/application/use-cases/authenticate-user.usecase";
import { UserProfileController } from "./models/controllers/user-profile.controller";
import { FindUserByIdUseCase } from "src/domain/user/application/use-cases/find-user-by-id.usecase";
import { LogoutUserController } from "./models/controllers/logout-user.controller";
import { LogoutUserUseCase } from "src/domain/user/application/use-cases/logout-user.usecase";
import { Blacklist } from "src/domain/user/authentication/blacklist";
import { RedisService } from "src/infra/auth/redis/redis.service";
import { RedisModule } from "src/infra/auth/redis/redis.module";

@Module({
  imports: [CryptographyModule, DatabaseModule, RedisModule],
  controllers: [
    CreateUserController,
    AuthenticateUserController,
    UserProfileController,
    LogoutUserController,
  ],
  providers: [
    CreateUserUseCase,
    AuthenticateUserUseCase,
    FindUserByIdUseCase,
    LogoutUserUseCase,
    {
      provide: Blacklist,
      useClass: RedisService,
    },
  ],
})
export class UserModule {}
