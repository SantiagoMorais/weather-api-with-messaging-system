import { Module } from "@nestjs/common";
import { CreateUserUseCase } from "src/domain/user/application/use-cases/create-user.usecase";
import { CryptographyModule } from "src/infra/cryptography/cryptography.module";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateUserController } from "./models/controllers/create-user.controller";

@Module({
  imports: [CryptographyModule, DatabaseModule],
  controllers: [CreateUserController],
  providers: [CreateUserUseCase],
})
export class UserModule {}
