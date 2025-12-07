import {
  IFindManyWeatherLogRecentRequest,
  TFindManyWeatherLogRecentResponse,
} from "src/domain/weatherLog/enterprise/interfaces/find-many-weather-log-recent-use-case";
import { WeatherLogRepository } from "../repositories/weather-log.repository";
import { success } from "src/core/result";
import { Injectable } from "@nestjs/common";

const DEFAULT_WEATHERS_COUNT = 12;

@Injectable()
export class FindManyWeatherLogRecentUseCase {
  constructor(private weatherLogRepository: WeatherLogRepository) {}

  async execute({
    count,
  }: IFindManyWeatherLogRecentRequest): Promise<TFindManyWeatherLogRecentResponse> {
    const weatherLogs = await this.weatherLogRepository.findManyRecent(
      count ?? DEFAULT_WEATHERS_COUNT
    );

    return success({ weatherLogs });
  }
}
