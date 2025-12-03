import { TUserRoles } from "src/core/types/user-roles";
import { ITimestamps } from "../timestamps";

export interface IUsersProps extends ITimestamps {
  email: string;
  name: string;
  password: string;
  roles: Array<TUserRoles>;
}
