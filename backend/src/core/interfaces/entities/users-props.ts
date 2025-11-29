import { ITimestamps } from "../timestamps";

export interface IUsersProps extends ITimestamps {
  email: string;
  name: string;
  password: string;
}
