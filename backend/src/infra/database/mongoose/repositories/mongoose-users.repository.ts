import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UsersRepository } from "src/domain/user/application/repositories/users.repository";
import { User as UserDomain } from "src/domain/user/enterprise/entities/user.entity";
import { UserDocument, User } from "../schemas/user.schema";
import { Model } from "mongoose";
import { MongooseUserMapper } from "../mappers/mongoose-user.mapper";

@Injectable()
export class MongooseUsersRepository implements UsersRepository {
  constructor(
    @InjectModel(User.name)
    private userModal: Model<UserDocument>
  ) {}

  async create(user: UserDomain): Promise<void> {
    const data = MongooseUserMapper.toMongoose(user);

    await this.userModal.create(data);
  }

  async findByEmail(email: string): Promise<UserDomain | null> {
    const user = await this.userModal.findOne({ email });

    if (!user) {
      return null;
    }

    return MongooseUserMapper.toDomain(user);
  }
}
