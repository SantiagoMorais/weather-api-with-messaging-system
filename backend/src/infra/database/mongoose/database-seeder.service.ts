import { Injectable, Logger } from "@nestjs/common";
import { SeedAdminUserUseCase } from "src/domain/user/application/use-cases/seed-admin-user.usecase";

@Injectable()
export class DatabaseSeederService {
  constructor(private seedAdmin: SeedAdminUserUseCase) {}

  async run() {
    const adminCreated = await this.seedAdmin.execute();

    if (adminCreated) {
      Logger.log("Admin user created!", "Seed");
    } else {
      Logger.log("Admin user already exists.", "Seed");
    }
    // other seeds
  }
}
