import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repositores/users-repository";
import {
  ICreateUserUseCaseRequest,
  ICreateUserUseCaseResponse,
} from "src/core/interfaces/use-cases/user/create-user-use-case";
import { UserAlreadyExistsError } from "src/core/errors/user-already-exists-error";
import { failure, success } from "src/core/result";
import { PasswordMismatchError } from "src/core/errors/password-mismatch-error";
import { User } from "../../enterprise/entities/user";

@Injectable()
export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
    repeatPassword,
  }: ICreateUserUseCaseRequest): Promise<ICreateUserUseCaseResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) return failure(new UserAlreadyExistsError(email));
    if (password !== repeatPassword)
      return failure(new PasswordMismatchError());

    const user = User.create({
      email,
      name,
      password,
    });

    await this.usersRepository.create(user);
    return success({ user });
  }
}
