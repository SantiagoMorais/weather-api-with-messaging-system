import {
  IAuthenticateUserRequest,
  IAuthenticateUserResponse,
} from "src/core/interfaces/use-cases/user/authenticate-user-use-case";
import { Cryptographer } from "../../cryptography/cryptographer";
import { HashComparer } from "../../cryptography/hash-comparer";
import { UsersRepository } from "../repositories/users-repository";
import { WrongCredentialsError } from "src/core/errors/wrong-credentials-error";
import { failure, success } from "src/core/result";

export class AuthenticateUser {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
    private cryptographer: Cryptographer
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserRequest): Promise<IAuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) return failure(new WrongCredentialsError());

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password
    );

    if (!isPasswordValid) return failure(new WrongCredentialsError());

    // sub = subject (identifies the Entity that is the subject of the token)
    const accessToken = await this.cryptographer.encrypt({
      sub: user.id.toString(),
    });

    return success({ accessToken });
  }
}
