import type { IGetMostRecentInsightResponse } from "@/core/interfaces/get-most-recent-insight-response";
import { env } from "@/env";
import axios from "axios";

export const getMostRecentAIInsight =
  async (): Promise<IGetMostRecentInsightResponse> => {
    const token = localStorage.getItem("gdash-token");
    const baseUrl = env.VITE_NEST_API_URL;
    const { data } = await axios.get<IGetMostRecentInsightResponse>(
      `${baseUrl}/weather-logs/insight`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  };
