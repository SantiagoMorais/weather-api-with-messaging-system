import { ILocation } from "./location";
import { IObservationStats } from "./observation-stats";

export interface IPersistedWeatherLog {
  currentForecast: IObservationStats[];
  hourlyObservation: IObservationStats;
  location: ILocation;
  insight?: string | null;
}
