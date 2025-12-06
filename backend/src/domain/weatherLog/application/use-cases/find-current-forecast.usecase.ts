import { TFindCurrentForecastResponse } from "src/core/interfaces/use-cases/weather-log/find-current-forecast-use-case";
import { failure, success } from "src/core/result";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { Injectable } from "@nestjs/common";
import { WeatherLogRepository } from "../repositories/weather-log.repository";

@Injectable()
export class FindCurrentForecastUseCase {
  constructor(private weatherLogRepository: WeatherLogRepository) {}

  async execute(): Promise<TFindCurrentForecastResponse> {
    const weatherLog = await this.weatherLogRepository.findMostRecentLog();

    if (!weatherLog)
      return failure(
        new DataNotFoundError("Current forecast was not created yet.")
      );

    return success({
      currentForecast: weatherLog.currentForecastStats,
      id: weatherLog.id.toString(),
    });
  }
}
