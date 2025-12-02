import { Result } from "src/core/result";
import { WeatherLog } from "src/domain/weatherLog/enterprise/entities/weather-log.entity";

export interface IFindManyWeatherLogRecentRequest {
  count: number;
}

export type TFindManyWeatherLogRecentResponse = Result<
  null,
  { weatherLogs: WeatherLog[] }
>;
