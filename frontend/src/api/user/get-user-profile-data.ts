import type { IGetUserProfileDataResponse } from "@/core/interfaces/get-user-profile-data-response";
import { env } from "@/env";
import axios from "axios";

export const getUserProfileData =
  async (): Promise<IGetUserProfileDataResponse> => {
    const token = localStorage.getItem("gdash-token");
    const baseUrl = env.VITE_NEST_API_URL;
    const { data } = await axios.get<IGetUserProfileDataResponse>(
      `${baseUrl}/users/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  };
