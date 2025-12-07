import { ILocation } from "src/domain/weatherLog/enterprise/api/location";
import { IObservationStats } from "src/domain/weatherLog/enterprise/api/observation-stats";

export interface IToMongooseWeatherLogResult {
  id: string;
  hourlyObservationStats: IObservationStats;
  currentForecastStats: IObservationStats[];
  location: ILocation;
  insight: string | null | undefined;
  createdAt: Date;
  updatedAt: Date | null | undefined;
}
