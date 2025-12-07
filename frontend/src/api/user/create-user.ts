import type { TCreateUser } from "@/core/api/requests/create-user-schema";
import { env } from "@/env";
import axios, { type AxiosResponse } from "axios";

export const createUser = async (data: TCreateUser): Promise<void> => {
  const baseUrl = env.VITE_NEST_API_URL;
  await axios.post<void, AxiosResponse<void>, TCreateUser>(
    `${baseUrl}/users`,
    data
  );
};
