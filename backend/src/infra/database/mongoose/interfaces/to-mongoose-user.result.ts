import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { TUserRoles } from "src/core/types/user-roles";

export interface IToMongooseUserResult {
  id: UniqueEntityId;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date | null | undefined;
  roles: TUserRoles[];
}
