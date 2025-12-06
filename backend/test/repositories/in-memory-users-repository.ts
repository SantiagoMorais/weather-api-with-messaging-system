/* eslint-disable @typescript-eslint/require-await */
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { UsersRepository } from "src/domain/user/application/repositories/users.repository";
import { User } from "src/domain/user/enterprise/entities/user.entity";

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);
    if (!user) return null;
    return user;
  }

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findById(id: UniqueEntityId): Promise<User | null> {
    const user = this.users.find((user) => user.id.equals(id));
    if (!user) return null;
    return user;
  }
}
