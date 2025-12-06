import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { User } from "../../enterprise/entities/user.entity";

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>;
  abstract findById(id: UniqueEntityId): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
}
