import { ApiProperty } from "@nestjs/swagger";
import { IUserProfileControllerResponse } from "../interfaces/user-profile-controller.response";

export class UserProfileResponseDTO implements IUserProfileControllerResponse {
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
    example: "iamironman@starkindustry.com",
    type: Date,
  })
  createdAt: Date;
}
