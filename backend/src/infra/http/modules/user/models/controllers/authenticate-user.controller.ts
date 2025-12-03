import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthenticateUserUseCase } from "src/domain/user/application/use-cases/authenticate-user.usecase";
import { Public } from "src/infra/auth/public";
import { ZodValidationPipe } from "src/infra/http/pipes/zod-validation.pipe";
import {
  authenticateUserSchema,
  type TAuthenticateControllerRequest,
} from "../schemas/authenticate-user-schema";
import { WrongCredentialsError } from "src/core/errors/wrong-credentials-error";
import { AuthenticateUserSwaggerDTO } from "../dto/authenticate-user-swagger.dto";

const bodyValidationPipe = new ZodValidationPipe(authenticateUserSchema);

@ApiTags("Users")
@Controller("/users/auth")
@Public()
export class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Post()
  @ApiBody({ type: AuthenticateUserSwaggerDTO })
  @ApiResponse({ status: 200, description: "Ok - User authenticated" })
  @ApiResponse({
    status: 400,
    description: "Bad request - Zod Validation Error",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid credentials",
  })
  async handle(@Body(bodyValidationPipe) body: TAuthenticateControllerRequest) {
    Logger.log("Verifying user by email", "AuthenticateUserController");
    const { email, password } = body;

    const result = await this.authenticateUserUseCase.execute({
      email,
      password,
    });

    if (result.isFailure()) {
      const error = result.value;

      Logger.log(error.message, "AuthenticateUserController");
      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    } else {
      Logger.log("User authenticated", "AuthenticateUserController");
    }

    const { accessToken } = result.value;

    return {
      access_token: accessToken,
    };
  }
}
