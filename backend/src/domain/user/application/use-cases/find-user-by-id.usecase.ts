import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repositories/users.repository";
import {
  IFindUserByIdUseCaseRequest,
  TFindUserByIdUseCaseResponse,
} from "src/core/interfaces/use-cases/user/find-user-by-id-use-case";
import { failure, success } from "src/core/result";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";

@Injectable()
export class FindUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: IFindUserByIdUseCaseRequest): Promise<TFindUserByIdUseCaseResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user)
      return failure(
        new DataNotFoundError(
          `User not found with the received id: ${id.toString()}`
        )
      );

    return success({ user });
  }
}
