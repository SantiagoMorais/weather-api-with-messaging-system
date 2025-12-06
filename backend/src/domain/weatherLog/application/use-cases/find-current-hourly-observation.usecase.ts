import { Injectable } from "@nestjs/common";
import { WeatherLogRepository } from "../repositories/weather-log.repository";
import { TFindHourlyObservationResponse } from "src/core/interfaces/use-cases/weather-log/find-hourly-observation-use-case";
import { failure, success } from "src/core/result";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";

@Injectable()
export class FindCurrentHourlyObservationUseCase {
  constructor(private weatherLogRepository: WeatherLogRepository) {}

  async execute(): Promise<TFindHourlyObservationResponse> {
    const weatherLog = await this.weatherLogRepository.findMostRecent();

    if (!weatherLog)
      return failure(
        new DataNotFoundError("There is not a weather log registered yet.")
      );

    return success({
      hourlyObservation: weatherLog.hourlyObservationStats,
      id: weatherLog.id.toString(),
    });
  }
}
