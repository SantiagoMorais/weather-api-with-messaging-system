import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Logger,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthenticateUserUseCase } from "src/domain/user/application/use-cases/authenticate-user.usecase";
import { Public } from "src/infra/auth/decorators/public.decorator";
import { ZodValidationPipe } from "src/infra/http/pipes/zod-validation.pipe";
import {
  authenticateUserSchema,
  type TAuthenticateControllerRequest,
} from "../schemas/authenticate-user-schema";
import { WrongCredentialsError } from "src/core/errors/wrong-credentials-error";
import { AuthenticateUserSwaggerDTO } from "../dto/authenticate-user-swagger.dto";
import { IAuthenticateUserControllerResponse } from "../interfaces/authenticate-user-controller.response";
import { AuthenticateUserResponseDTO } from "../dto/authenticate-user-response.dto";

const bodyValidationPipe = new ZodValidationPipe(authenticateUserSchema);

@ApiTags("Users")
@Controller("/users/auth")
@Public()
export class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Post()
  @HttpCode(200)
  @ApiBody({ type: AuthenticateUserSwaggerDTO })
  @ApiOkResponse({
    description: "Ok - User authenticated",
    type: AuthenticateUserResponseDTO,
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Zod Validation Error",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid credentials",
  })
  async handle(
    @Body(bodyValidationPipe) body: TAuthenticateControllerRequest
  ): Promise<IAuthenticateUserControllerResponse> {
    Logger.log("Verifying user by email", "AuthenticateUserController");
    const { email, password } = body;

    const result = await this.authenticateUserUseCase.execute({
      email,
      password,
    });

    if (result.isFailure()) {
      const error = result.value;

      Logger.error(error.message, "AuthenticateUserController");
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
