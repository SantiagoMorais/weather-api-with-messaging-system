import { Module } from "@nestjs/common";
import { CreateUserController } from "./models/controllers/create-user.controller";
import { CreateUserUseCase } from "src/domain/user/application/use-cases/create-user.usecase";

@Module({
  controllers: [CreateUserController],
  providers: [CreateUserUseCase],
})
export class UserModule {}
