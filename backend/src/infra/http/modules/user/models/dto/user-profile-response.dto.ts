import { ApiProperty } from "@nestjs/swagger";
import { IUserProfileControllerResponse } from "../interfaces/user-profile-controller.response";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";

export class UserProfileResponseDTO implements IUserProfileControllerResponse {
  @ApiProperty({
    description: "The database id of the user",
    example: new UniqueEntityId().toString(),
  })
  id: string;

  @ApiProperty({
    description: "The fullname of the authenticated user",
    example: "Tony Stark",
  })
  name: string;

  @ApiProperty({
    description: "The email of the authenticated user",
    example: "iamironman@starkindustry.com",
  })
  email: string;

  @ApiProperty({
    description: "The date of the creation of the authenticated user",
    example: new Date().toISOString(),
    type: Date,
  })
  createdAt: Date;
}
