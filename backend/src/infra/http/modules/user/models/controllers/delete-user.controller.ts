import {
  BadRequestException,
  Controller,
  Delete,
  Logger,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { ActionNotPermittedError } from "src/core/errors/action-not-permitted-error";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { type TUserPayload } from "src/core/types/utility-types/token-payload-schema";
import { DeleteUserUseCase } from "src/domain/user/application/use-cases/delete-user-usecase";
import { CurrentUser } from "src/infra/auth/decorators/current-user.decorator";

@ApiTags("Users")
@Controller("/users/delete")
export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  @Delete()
  @ApiResponse({
    status: 400,
    description: "Bad request - Zod Validation Error",
  })
  @ApiResponse({
    status: 401,
    description: "Not allowed - Admin user cannot be deleted",
  })
  @ApiResponse({
    status: 404,
    description: "Not found - User not found",
  })
  async handle(@CurrentUser() user: TUserPayload): Promise<void> {
    const userId = new UniqueEntityId(user.sub);

    Logger.log("Searching for the user");

    const response = await this.deleteUserUseCase.execute({ userId });

    if (response.isFailure()) {
      const error = response.value;

      Logger.error(error.message);

      switch (error.constructor) {
        case ActionNotPermittedError:
          throw new UnauthorizedException(error.message);
        case DataNotFoundError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException();
      }
    }

    Logger.log("User deleted successfully");
  }
}
