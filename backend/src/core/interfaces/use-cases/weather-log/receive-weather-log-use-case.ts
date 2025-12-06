import { ILocation } from "../../services/open-weather/location";
import { IObservationStats } from "../../services/open-weather/observation-stats";
import { Result } from "src/core/result";
import { DataAlreadyExistsError } from "src/core/errors/data-already-exists-error";

export interface IReceiveWeatherLogRequest {
  hourlyObservationStats: IObservationStats;
  currentForecastStats: IObservationStats[];
  location: ILocation;
  createdAt: Date;
}

export type TReceiveWeatherLogResponse = Result<
  DataAlreadyExistsError,
  {
    id: string; // Entity ID
    hourlyObservation: IObservationStats;
    currentForecast: IObservationStats[];
  }
>;
