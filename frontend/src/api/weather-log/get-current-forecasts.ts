import type { ICurrentForecastResponse } from "@/core/interfaces/current-forecast-response";
import { env } from "@/env";
import axios from "axios";

export const getCurrentForecast =
  async (): Promise<ICurrentForecastResponse> => {
    const token = localStorage.getItem("gdash-token");
    const baseUrl = env.VITE_NEST_API_URL;
    const { data } = await axios.get<ICurrentForecastResponse>(
      `${baseUrl}/weather-logs/current-forecast`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  };
