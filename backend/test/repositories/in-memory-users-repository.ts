/* eslint-disable @typescript-eslint/require-await */
import { UsersRepository } from "src/domain/user/application/repositories/users.repository";
import { User } from "src/domain/user/enterprise/entities/user.entity";

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);
    if (!user) return null;
    return user;
  }
}
