import { failure, success } from "src/core/result";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { Injectable } from "@nestjs/common";
import { WeatherLogRepository } from "../repositories/weather-log.repository";
import { TFindLocationUseCaseResponse } from "src/core/interfaces/use-cases/weather-log/find-location-use-case";

@Injectable()
export class FindLocationUseCase {
  constructor(private weatherLogRepository: WeatherLogRepository) {}

  async execute(): Promise<TFindLocationUseCaseResponse> {
    const weatherLog = await this.weatherLogRepository.findMostRecentLog();

    if (!weatherLog)
      return failure(
        new DataNotFoundError("Current forecast was not created yet.")
      );

    return success({
      location: weatherLog.location,
      id: weatherLog.id.toString(),
    });
  }
}
