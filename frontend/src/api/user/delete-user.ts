import { env } from "@/env";
import axios from "axios";

export const deleteUser = async () => {
  const baseUrl = env.VITE_NEST_API_URL;
  const token = localStorage.getItem("gdash-token");

  await axios.delete<void>(`${baseUrl}/users/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
