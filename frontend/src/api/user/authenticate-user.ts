import type { TAuthenticateUser } from "@/core/api/requests/authenticate-user-schema";
import type { IAuthenticateUserResponse } from "@/core/api/responses/authenticate-user-response";
import { env } from "@/env";
import axios, { type AxiosResponse } from "axios";

export const authenticateUser = async (payload: TAuthenticateUser) => {
  const baseUrl = env.VITE_NEST_API_URL;
  const { data: token } = await axios.post<
    IAuthenticateUserResponse,
    AxiosResponse<IAuthenticateUserResponse>,
    TAuthenticateUser
  >(`${baseUrl}/users/auth`, payload);

  return token;
};
