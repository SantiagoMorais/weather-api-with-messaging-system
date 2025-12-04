import { ApiProperty } from "@nestjs/swagger";
import { IAuthenticateUserControllerResponse } from "../interfaces/authenticate-user-controller.response";

export class AuthenticateUserResponseDTO implements IAuthenticateUserControllerResponse {
  @ApiProperty({
    type: String,
    description: "The token necessary to access the private routes",
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30",
  })
  access_token: string;
}
