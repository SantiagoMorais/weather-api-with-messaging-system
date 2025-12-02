import { User as DomainUser } from "src/domain/user/enterprise/entities/user.entity";
import { UserDocument } from "../schemas/user.schema";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";

export class MongooseUserMapper {
  static toDomain(raw: UserDocument): DomainUser {
    if (!raw._id) {
      throw new Error(
        "Mongoose Document must have an _id to be mapped to a Domain Entity"
      );
    }

    return DomainUser.create(
      {
        email: raw.email,
        name: raw.name,
        password: raw.password,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw._id.toString())
    );
  }

  static toMongoose(user: DomainUser) {
    return {
      _id: user.id.toString(),
      email: user.email,
      name: user.name,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
