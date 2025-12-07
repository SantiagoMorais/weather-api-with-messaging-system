import type { IHourlyObservationWithId } from "@/core/interfaces/hourly-observation-with-id";
import { env } from "@/env";
import axios from "axios";

export const getMostRecentHourlyObservation =
  async (): Promise<IHourlyObservationWithId> => {
    const token = localStorage.getItem("gdash-token");
    const baseUrl = env.VITE_NEST_API_URL;
    const { data } = await axios.get<IHourlyObservationWithId>(
      `${baseUrl}/weather-logs/hourly-observation`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  };
