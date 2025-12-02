import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repositories/users.repository";
import {
  IFindUserByEmailUseCaseRequest,
  TFindUserByEmailUseCaseResponse,
} from "src/core/interfaces/use-cases/user/find-user-by-email-use-case";
import { failure, success } from "src/core/result";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";

@Injectable()
export class FindUserByEmailUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
  }: IFindUserByEmailUseCaseRequest): Promise<TFindUserByEmailUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user)
      return failure(
        new DataNotFoundError(
          `User not found with the received email: ${email}`
        )
      );

    return success({ user });
  }
}
