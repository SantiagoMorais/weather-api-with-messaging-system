import { ILocation } from "../location";
import { IObservationStats } from "../observation-stats";
import { ITimestamps } from "../timestamps";

export interface IWeatherLogProps extends ITimestamps {
  hourlyObservationStats: IObservationStats;
  currentForecastStats: IObservationStats[];
  location: ILocation;
  insight?: string | null;
}
