import { ApiProperty } from "@nestjs/swagger";
import { TAuthenticateControllerRequest } from "../schemas/authenticate-user-schema";

export class AuthenticateUserSwaggerDTO implements TAuthenticateControllerRequest {
  @ApiProperty({
    description: "User email to login",
    example: "john@mail.com",
    required: true,
  })
  email: string;

  @ApiProperty({
    description:
      "User password, must contain at least eight characters, one uppercase letter, one number, and one special character(!, @, #, $, %, ^, &, *, ?)",
    example: "John#123",
    required: true,
  })
  password: string;
}
