import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { Result } from "src/core/result";
import { WeatherLog } from "src/domain/weatherLog/enterprise/entities/weather-log.entity";

export interface IFindWeatherLogByDateUseCaseRequest {
  date: Date;
}

export type TFindWeatherLogByDateUseCaseResponse = Result<
  DataNotFoundError,
  { weatherLog: WeatherLog }
>;
