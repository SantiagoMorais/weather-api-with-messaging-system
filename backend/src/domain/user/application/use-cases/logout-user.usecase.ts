import { Injectable } from "@nestjs/common";
import { Blacklist } from "../../authentication/blacklist";
import { TLogoutUserUseCaseResponse } from "../../enterprise/interfaces/logout-user-use-case";
import { failure, success } from "src/core/result";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";

@Injectable()
export class LogoutUserUseCase {
  constructor(private blacklist: Blacklist) {}

  async execute(
    token: string | undefined,
    expInSeconds: number
  ): Promise<TLogoutUserUseCaseResponse> {
    if (!token)
      return failure(
        new DataNotFoundError("Token already expired or not exist")
      );

    await this.blacklist.blacklistToken(token, expInSeconds);
    return success(undefined);
  }
}
