import {
  BadRequestException,
  Controller,
  Logger,
  NotFoundException,
  Post,
  Req,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiTags } from "@nestjs/swagger";
import { type Request } from "express";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { LogoutUserUseCase } from "src/domain/user/application/use-cases/logout-user.usecase";

@ApiTags("Users")
@Controller()
export class LogoutUserController {
  constructor(
    private logoutUserUseCase: LogoutUserUseCase,
    private jwt: JwtService
  ) {}

  @Post()
  async handle(@Req() req: Request) {
    Logger.log("Start adding token into blacklist", "LogoutUserController");
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      Logger.error(
        "Token not found. Token not added into blacklist",
        "LogoutUserController"
      );
      throw new NotFoundException("Token not found");
    }

    const decoded = (await this.jwt.decode(token)) as { exp?: number } | null;
    if (!decoded || !decoded.exp) {
      Logger.error(
        "Token invalid. Token not added into blacklist",
        "LogoutUserController"
      );
      throw new BadRequestException("Invalid token");
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const expInSeconds = decoded.exp - currentTime;

    const result = await this.logoutUserUseCase.execute(token, expInSeconds);

    if (result.isFailure()) {
      const error = result.value;

      Logger.error(error.message, "LogoutUserController");

      switch (error.constructor) {
        case DataNotFoundError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException();
      }
    }

    Logger.log(
      "Token added into blacklist successfully",
      "LogoutUserController"
    );
  }
}
