import { Injectable } from "@nestjs/common";
import { Blacklist } from "../../authentication/blacklist";

@Injectable()
export class LogoutUserUseCase {
  constructor(private blacklist: Blacklist) {}

  async execute(token: string, expInSeconds: number) {
    await this.blacklist.blacklistToken(token, expInSeconds);
  }
}
