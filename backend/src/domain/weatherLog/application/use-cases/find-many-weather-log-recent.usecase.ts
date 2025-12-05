import {
  IFindManyWeatherLogRecentRequest,
  TFindManyWeatherLogRecentResponse,
} from "src/core/interfaces/use-cases/weather-log/find-many-weather-log-recent-use-case";
import { WeatherLogRepository } from "../repositories/weather-log.repository";
import { success } from "src/core/result";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindManyWeatherLogRecentUseCase {
  constructor(private weatherLogRepository: WeatherLogRepository) {}

  async execute({
    count,
  }: IFindManyWeatherLogRecentRequest): Promise<TFindManyWeatherLogRecentResponse> {
    const weatherLogs = await this.weatherLogRepository.findManyRecent(count);

    return success({ weatherLogs });
  }
}
