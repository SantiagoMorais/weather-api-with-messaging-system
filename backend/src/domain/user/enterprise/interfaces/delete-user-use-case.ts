import { Result } from "src/core/result";
import { User } from "../entities/user.entity";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";

export interface IDeleteUserUseCaseRequest {
  userId: UniqueEntityId;
}

export type TDeleteUserUseCaseResponse = Result<DataNotFoundError, void>;
