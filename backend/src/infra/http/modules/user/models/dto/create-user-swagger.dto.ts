import { ApiProperty } from "@nestjs/swagger";
import { TCreateUserControllerRequest } from "../schemas/create-user-body-schema";

export class CreateUserSwaggerDTO implements TCreateUserControllerRequest {
  @ApiProperty({
    description: "User email to login",
    example: "john@mail.com",
    required: true,
  })
  email: string;

  @ApiProperty({
    description: "User fullname",
    example: "John Doe",
    required: true,
  })
  name: string;

  @ApiProperty({
    description:
      "User password, must contain at least eight characters, one uppercase letter, one number, and one special character(!, @, #, $, %, ^, &, *, ?)",
    example: "John#123",
    required: true,
  })
  password: string;

  @ApiProperty({
    description: "Must be identical to the password",
    example: "John#123",
    required: true,
  })
  repeatPassword: string;
}
