import { IObservationStats } from "src/domain/weatherLog/enterprise/api/observation-stats";
import { ITimestamps } from "../timestamps";
import { ILocation } from "src/domain/weatherLog/enterprise/api/location";

export interface IWeatherLogProps extends ITimestamps {
  hourlyObservationStats: IObservationStats;
  currentForecastStats: IObservationStats[];
  location: ILocation;
  insight?: string | null;
}
