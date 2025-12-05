import { ILocation } from "src/core/interfaces/location";
import { IObservationStats } from "src/core/interfaces/observation-stats";

export interface IWeatherLogSummarized {
  createdAt: Date;
  updatedAt?: Date | null;
  insight?: string | null;
  hourlyObservationStats: IObservationStats;
}

export interface IFindManyWeatherLogsResponse {
  location?: ILocation;
  weatherLogs: IWeatherLogSummarized[];
}
