import { ILocation } from "../../services/open-weather/location";
import { IObservationStats } from "../../services/open-weather/observation-stats";
import { Result } from "src/core/result";
import { DataAlreadyExistsError } from "src/core/errors/data-already-exists-error";
import { WeatherLog } from "src/domain/weatherLog/enterprise/entities/weather-log.entity";

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
