import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  NotFoundException
} from "@nestjs/common";
import { ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { type TUserPayload } from "src/core/types/utility-types/token-payload-schema";
import { FindUserByIdUseCase } from "src/domain/user/application/use-cases/find-user-by-id.usecase";
import { CurrentUser } from "src/infra/auth/decorators/current-user.decorator";
import { UserProfileResponseDTO } from "../dto/user-profile-response.dto";
import { IUserProfileControllerResponse } from "../interfaces/user-profile-controller.response";

@ApiTags("Users")
@Controller("/users")
export class UserProfileController {
  constructor(private findUserByIdUseCase: FindUserByIdUseCase) {}

  @Get("/me")
  @ApiOkResponse({ type: UserProfileResponseDTO })
  @ApiResponse({
    status: 400,
    description: "Bad request - Zod Validation Error",
  })
  @ApiResponse({
    status: 404,
    description: "Not found - User data not found",
  })
  async handle(
    @CurrentUser() user: TUserPayload
  ): Promise<IUserProfileControllerResponse> {
    const userId = new UniqueEntityId(user.sub);

    Logger.log("Searching for the user");
    const response = await this.findUserByIdUseCase.execute({ id: userId });

    if (response.isFailure()) {
      const error = response.value;

      Logger.error(error.message);

      switch (error.constructor) {
        case DataNotFoundError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException();
      }
    }

    const { user: authUser } = response.value;

    return {
      createdAt: authUser.createdAt,
      email: authUser.email,
      name: authUser.name,
      id: authUser.id.toString(),
    };
  }
}
