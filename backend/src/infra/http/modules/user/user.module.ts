import { Module } from "@nestjs/common";
import { UserController } from "./models/controllers/user.controller";

@Module({
  controllers: [UserController],
})
export class UserModule {}
