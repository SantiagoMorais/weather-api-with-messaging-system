import { Injectable } from "@nestjs/common";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { TFindMostRecentWeatherLogUseCaseResponse } from "src/domain/weatherLog/enterprise/interfaces/find-weather-log-by-date-use-case";
import { failure, success } from "src/core/result";
import { WeatherLogRepository } from "../repositories/weather-log.repository";

@Injectable()
export class FindMostRecentWeatherLogUseCase {
  constructor(private weatherLogRepository: WeatherLogRepository) {}

  async execute(): Promise<TFindMostRecentWeatherLogUseCaseResponse> {
    const weatherLog = await this.weatherLogRepository.findMostRecent();

    if (!weatherLog)
      return failure(
        new DataNotFoundError(`There is any weather log created yet.`)
      );
    return success({ weatherLog });
  }
}
