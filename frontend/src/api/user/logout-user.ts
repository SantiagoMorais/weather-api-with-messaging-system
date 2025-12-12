import { env } from "@/env";
import axios from "axios";

export const logoutUser = async () => {
  const baseUrl = env.VITE_NEST_API_URL;
  const token = localStorage.getItem("gdash-token");

  await axios.post<void>(
    `${baseUrl}/users/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
