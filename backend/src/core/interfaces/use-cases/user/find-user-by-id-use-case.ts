import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { Result } from "src/core/result";
import { User } from "src/domain/user/enterprise/entities/user.entity";

export interface IFindUserByIdUseCaseRequest {
  id: UniqueEntityId;
}

export type TFindUserByIdUseCaseResponse = Result<
  DataNotFoundError,
  { user: User }
>;
