import { Module } from "@nestjs/common";
import { CreateUserUseCase } from "src/domain/user/application/use-cases/create-user.usecase";
import { CryptographyModule } from "src/infra/cryptography/cryptography.module";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateUserController } from "./models/controllers/create-user.controller";
import { AuthenticateUserController } from "./models/controllers/authenticate-user.controller";
import { AuthenticateUserUseCase } from "src/domain/user/application/use-cases/authenticate-user.usecase";

@Module({
  imports: [CryptographyModule, DatabaseModule],
  controllers: [CreateUserController, AuthenticateUserController],
  providers: [CreateUserUseCase, AuthenticateUserUseCase],
})
export class UserModule {}
