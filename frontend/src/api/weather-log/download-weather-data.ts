import { env } from "@/env";
import axios from "axios";

export const downloadWeatherData = async ({
  format,
}: {
  format: "csv" | "xlsx";
}): Promise<ArrayBuffer> => {
  const token = localStorage.getItem("gdash-token");
  const baseUrl = env.VITE_NEST_API_URL;
  const { data } = await axios.get<ArrayBuffer>(
    `${baseUrl}/weather-logs/export/${format}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "arraybuffer",
    }
  );

  return data;
};
