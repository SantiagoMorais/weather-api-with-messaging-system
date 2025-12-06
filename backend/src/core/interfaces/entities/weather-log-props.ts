import { ILocation } from "../services/open-weather/location";
import { IObservationStats } from "../services/open-weather/observation-stats";
import { ITimestamps } from "../timestamps";

export interface IWeatherLogProps extends ITimestamps {
  hourlyObservationStats: IObservationStats;
  currentForecastStats: IObservationStats[];
  location: ILocation;
  insight?: string | null;
}
