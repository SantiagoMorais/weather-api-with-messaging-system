import type { ICustomWeatherInsight } from "@/core/interfaces/custom-weather-insights";
import { env } from "@/env";
import axios from "axios";

export const getMostRecentCustomInsight =
  async (): Promise<ICustomWeatherInsight> => {
    const token = localStorage.getItem("gdash-token");
    const baseUrl = env.VITE_NEST_API_URL;
    const { data } = await axios.get<ICustomWeatherInsight>(
      `${baseUrl}/weather-logs/custom-insights`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  };
