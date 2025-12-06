import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { Result } from "src/core/result";
import { WeatherLog } from "src/domain/weatherLog/enterprise/entities/weather-log.entity";

export type TFindMostRecentWeatherLogUseCaseResponse = Result<
  DataNotFoundError,
  { weatherLog: WeatherLog }
>;
