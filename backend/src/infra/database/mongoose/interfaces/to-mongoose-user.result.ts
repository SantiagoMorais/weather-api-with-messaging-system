import { TUserRoles } from "src/core/types/user-roles";

export interface IToMongooseUserResult {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date | null | undefined;
  roles: TUserRoles[];
}
