import type { IGetUserProfileDataResponse } from "./get-user-profile-data-response";

export interface IUserSheetDataPendingInterface {
  data: IGetUserProfileDataResponse | undefined;
  error: Error | null;
  isPending: boolean;
}
