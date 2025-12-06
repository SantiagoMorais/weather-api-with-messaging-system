import { ILocation } from "src/core/interfaces/services/open-weather/location";
import { IObservationStats } from "src/core/interfaces/services/open-weather/observation-stats";

export interface IToMongooseWeatherLogResult {
  id: string;
  hourlyObservationStats: IObservationStats;
  currentForecastStats: IObservationStats[];
  location: ILocation;
  insight: string | null | undefined;
  createdAt: Date;
  updatedAt: Date | null | undefined;
}
