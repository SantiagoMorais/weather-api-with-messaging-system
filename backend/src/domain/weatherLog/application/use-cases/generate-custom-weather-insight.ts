import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { failure, success } from "src/core/result";
import { classifyObservation } from "../../enterprise/classify-observation";
import { TGenerateCustomWeatherInsightUseCaseResponse } from "../../enterprise/interfaces/generate-custom-weather-insight-use-case";
import { WeatherLogRepository } from "../repositories/weather-log.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GenerateCustomWeatherInsight {
  constructor(private weatherLogRepository: WeatherLogRepository) {}

  async execute(): Promise<TGenerateCustomWeatherInsightUseCaseResponse> {
    const log = await this.weatherLogRepository.findMostRecent();

    if (!log)
      return failure(
        new DataNotFoundError("There are not any weather log created yet.")
      );

    const insights = classifyObservation(log.hourlyObservationStats);

    return success({ insights });
  }
}
