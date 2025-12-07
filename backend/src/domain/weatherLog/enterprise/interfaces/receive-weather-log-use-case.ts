import { Result } from "src/core/result";
import { DataAlreadyExistsError } from "src/core/errors/data-already-exists-error";
import { WeatherLog } from "src/domain/weatherLog/enterprise/entities/weather-log.entity";
import { IObservationStats } from "../api/observation-stats";
import { ILocation } from "../api/location";

export interface IReceiveWeatherLogRequest {
  hourlyObservationStats: IObservationStats;
  currentForecastStats: IObservationStats[];
  location: ILocation;
  createdAt: Date;
}

export type TReceiveWeatherLogResponse = Result<
  DataAlreadyExistsError,
  {
    weatherLog: WeatherLog;
  }
>;
