import { PasswordMismatchError } from "src/core/errors/password-mismatch-error";
import { UserAlreadyExistsError } from "src/core/errors/user-already-exists-error";
import { Result } from "src/core/result";
import { TUserRoles } from "src/core/types/user-roles";
import { User } from "src/domain/user/enterprise/entities/user.entity";

export interface ICreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  roles?: Array<TUserRoles>;
}

export type TCreateUserUseCaseResponse = Result<
  UserAlreadyExistsError | PasswordMismatchError,
  {
    user: User;
  }
>;
