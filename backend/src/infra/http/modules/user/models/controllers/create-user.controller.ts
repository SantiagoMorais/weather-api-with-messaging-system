import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Logger,
  Post,
} from "@nestjs/common";
import { CreateUserUseCase } from "src/domain/user/application/use-cases/create-user.usecase";
import { Public } from "src/infra/auth/decorators/public.decorator";
import { ZodValidationPipe } from "src/infra/http/pipes/zod-validation.pipe";
import {
  createUserBodySchema,
  type TCreateUserControllerRequest,
} from "../schemas/create-user-body-schema";
import { UserAlreadyExistsError } from "src/core/errors/user-already-exists-error";
import { PasswordMismatchError } from "src/core/errors/password-mismatch-error";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserSwaggerDTO } from "../dto/create-user-swagger.dto";

const bodyValidationPipe = new ZodValidationPipe(createUserBodySchema);

@ApiTags("Users")
@Controller("/users")
@Public()
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  @ApiBody({ type: CreateUserSwaggerDTO })
  @ApiResponse({ status: 201, description: "Created - User created" })
  @ApiResponse({
    status: 400,
    description:
      "Bad request - Passwords doesn't match or Zod Validation Error",
  })
  @ApiResponse({ status: 409, description: "Conflict - User already exists" })
  async handle(@Body(bodyValidationPipe) body: TCreateUserControllerRequest) {
    const { email, name, password, repeatPassword } = body;

    Logger.log("Start creating user", "CreateUserController");
    const result = await this.createUserUseCase.execute({
      email,
      name,
      password,
      repeatPassword,
    });

    if (result.isFailure()) {
      const error = result.value;

      Logger.error(error.message, "CreateUserController");
      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message);
        case PasswordMismatchError:
          throw new BadRequestException(error.message);
        default:
          throw new BadRequestException();
      }
    }
    Logger.log("User created", "CreateUserController");
  }
}
