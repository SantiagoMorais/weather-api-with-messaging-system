import { WrongCredentialsError } from "src/core/errors/wrong-credentials-error";
import { Result } from "src/core/result";

export interface IAuthenticateUserRequest {
  email: string;
  password: string;
}

export type IAuthenticateUserResponse = Result<
  WrongCredentialsError,
  { accessToken: string }
>;
