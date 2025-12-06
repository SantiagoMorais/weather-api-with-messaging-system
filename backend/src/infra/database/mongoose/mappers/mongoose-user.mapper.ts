import { User as DomainUser } from "src/domain/user/enterprise/entities/user.entity";
import { UserDocument } from "../schemas/user.schema";
import { IToMongooseUserResult } from "../interfaces/to-mongoose-user.result";

export class MongooseUserMapper {
  static toDomain(raw: UserDocument): DomainUser {
    return DomainUser.create({
      email: raw.email,
      name: raw.name,
      password: raw.password,
      createdAt: raw.createdAt,
      roles: raw.roles,
      updatedAt: raw.updatedAt,
    });
  }

  static toMongoose(user: DomainUser): IToMongooseUserResult {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      roles: user.roles,
    };
  }
}
