import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repositories/users.repository";
import { User } from "../../enterprise/entities/user.entity";
import {
  IDeleteUserUseCaseRequest,
  TDeleteUserUseCaseResponse,
} from "../../enterprise/interfaces/delete-user-use-case";
import { failure, success } from "src/core/result";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { ActionNotPermittedError } from "src/core/errors/action-not-permitted-error";

@Injectable()
export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: IDeleteUserUseCaseRequest): Promise<TDeleteUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) return failure(new DataNotFoundError("User not exist"));

    if (user.roles.includes("Role_Admin"))
      return failure(
        new ActionNotPermittedError("You can't delete an admin user")
      );

    await this.usersRepository.delete(user);

    return success(undefined);
  }
}
