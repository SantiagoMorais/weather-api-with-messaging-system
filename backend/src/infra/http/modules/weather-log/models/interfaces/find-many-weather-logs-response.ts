import { ILocation } from "src/domain/weatherLog/enterprise/api/location";
import { IObservationStats } from "src/domain/weatherLog/enterprise/api/observation-stats";

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
