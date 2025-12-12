import { Result } from "src/core/result";
import { User } from "../entities/user.entity";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";

export interface IDeleteUserUseCaseRequest {
  user: User;
}

export type TDeleteUserUseCaseResponse = Result<DataNotFoundError, void>;
