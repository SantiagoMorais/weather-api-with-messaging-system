import { User } from "src/domain/user/enterprise/entities/user.entity";

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
