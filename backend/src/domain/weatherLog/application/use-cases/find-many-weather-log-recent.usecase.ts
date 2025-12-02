import {
  IFindManyWeatherLogRecentRequest,
  TFindManyWeatherLogRecentResponse,
} from "src/core/interfaces/use-cases/weather-log/find-many-weather-log-recent-use-case";
import { WeatherLogRepository } from "../repositories/weather-log.repository";
import { success } from "src/core/result";

export class FindManyWeatherLogRecent {
  constructor(private weatherLogRepository: WeatherLogRepository) {}

  async execute({
    count,
  }: IFindManyWeatherLogRecentRequest): Promise<TFindManyWeatherLogRecentResponse> {
    const weatherLogs = await this.weatherLogRepository.findManyRecent(count);

    return success({ weatherLogs });
  }
}
