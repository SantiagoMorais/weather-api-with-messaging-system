import { Injectable } from "@nestjs/common";
import { CreateUserUseCase } from "./create-user.usecase";

@Injectable()
export class SeedAdminUserUseCase {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async execute() {
    const email = "johndoe@gdash.com";

    const result = await this.createUserUseCase.execute({
      email,
      name: "John Doe",
      password: "Gdash@123",
      repeatPassword: "Gdash@123",
      roles: ["Role_Admin"],
    });

    if (result.isSuccess()) {
      return true;
    }

    return false;
  }
}
