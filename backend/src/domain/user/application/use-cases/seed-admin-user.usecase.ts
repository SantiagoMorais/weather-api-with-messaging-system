import { Injectable } from "@nestjs/common";
import { CreateUserUseCase } from "./create-user.usecase";
import { EnvService } from "src/infra/env/env.service";

@Injectable()
export class SeedAdminUserUseCase {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private envService: EnvService
  ) {}

  async execute() {
    const email = this.envService.get("SEED_USER_EMAIL");
    const password = this.envService.get("SEED_USER_PASS");

    const result = await this.createUserUseCase.execute({
      email,
      name: "John Doe",
      password,
      repeatPassword: password,
      roles: ["Role_Admin"],
    });

    if (result.isSuccess()) {
      return true;
    }

    return false;
  }
}
