import { ILocation } from "../../location";
import { IObservationStats } from "../../observation-stats";
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
    hourlyObservation: IObservationStats;
    currentForecast: IObservationStats[];
  }
>;
