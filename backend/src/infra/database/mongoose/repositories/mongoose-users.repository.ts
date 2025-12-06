import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UsersRepository } from "src/domain/user/application/repositories/users.repository";
import { User as UserDomain } from "src/domain/user/enterprise/entities/user.entity";
import { UserDocument, User } from "../schemas/user.schema";
import { Model } from "mongoose";
import { MongooseUserMapper } from "../mappers/mongoose-user.mapper";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";

@Injectable()
export class MongooseUsersRepository implements UsersRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {}

  async findById(id: UniqueEntityId): Promise<UserDomain | null> {
    const user = await this.userModel.findOne({ id: id.toString() });

    if (!user) {
      return null;
    }

    return MongooseUserMapper.toDomain(user);
  }

  async create(user: UserDomain): Promise<void> {
    const data = MongooseUserMapper.toMongoose(user);

    await this.userModel.create(data);
  }

  async findByEmail(email: string): Promise<UserDomain | null> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return null;
    }

    return MongooseUserMapper.toDomain(user);
  }
}
