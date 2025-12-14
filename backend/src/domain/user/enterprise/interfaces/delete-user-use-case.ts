import { Result } from "src/core/result";
import { User } from "../entities/user.entity";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { ActionNotPermittedError } from "src/core/errors/action-not-permitted-error";

export interface IDeleteUserUseCaseRequest {
  userId: UniqueEntityId;
}

export type TDeleteUserUseCaseResponse = Result<
  DataNotFoundError | ActionNotPermittedError,
  void
>;
