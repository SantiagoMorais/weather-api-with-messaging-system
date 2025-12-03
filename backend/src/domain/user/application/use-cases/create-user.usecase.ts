import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repositories/users.repository";
import {
  ICreateUserUseCaseRequest,
  TCreateUserUseCaseResponse,
} from "src/core/interfaces/use-cases/user/create-user-use-case";
import { UserAlreadyExistsError } from "src/core/errors/user-already-exists-error";
import { failure, success } from "src/core/result";
import { PasswordMismatchError } from "src/core/errors/password-mismatch-error";
import { User } from "../../enterprise/entities/user.entity";
import { HashGenerator } from "../../cryptography/hash-generator";

@Injectable()
export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    email,
    name,
    password,
    repeatPassword,
    roles,
  }: ICreateUserUseCaseRequest): Promise<TCreateUserUseCaseResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) return failure(new UserAlreadyExistsError(email));
    if (password !== repeatPassword)
      return failure(new PasswordMismatchError());

    const hashPassword = await this.hashGenerator.hash(password);

    const user = User.create({
      email,
      name,
      password: hashPassword,
      roles: roles ?? ["Role_User"],
    });

    await this.usersRepository.create(user);
    return success({ user });
  }
}
