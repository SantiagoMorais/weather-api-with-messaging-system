import { PasswordMismatchError } from "src/core/errors/password-mismatch-error";
import { UserAlreadyExistsError } from "src/core/errors/user-already-exists-error";
import { Result } from "src/core/result";
import { User } from "src/domain/user/enterprise/entities/user";

export interface ICreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export type ICreateUserUseCaseResponse = Result<
  UserAlreadyExistsError | PasswordMismatchError,
  {
    user: User;
  }
>;
