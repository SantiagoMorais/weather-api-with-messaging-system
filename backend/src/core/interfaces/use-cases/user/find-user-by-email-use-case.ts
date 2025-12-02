import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { Result } from "src/core/result";
import { User } from "src/domain/user/enterprise/entities/user.entity";

export interface IFindUserByEmailUseCaseRequest {
  email: string;
}

export type TFindUserByEmailUseCaseResponse = Result<
  DataNotFoundError,
  { user: User }
>;
