import { failure, success } from "src/core/result";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { Injectable } from "@nestjs/common";
import { WeatherLogRepository } from "../repositories/weather-log.repository";
import { TFindCurrentInsightUseCaseResponse } from "src/domain/weatherLog/enterprise/interfaces/find-current-insight-use-case";

@Injectable()
export class FindInsightUseCase {
  constructor(private weatherLogRepository: WeatherLogRepository) {}

  async execute(): Promise<TFindCurrentInsightUseCaseResponse> {
    const weatherLog = await this.weatherLogRepository.findMostRecent();

    if (!weatherLog)
      return failure(
        new DataNotFoundError("Current insight was not created yet.")
      );

    return success({
      insight: weatherLog.insight,
      id: weatherLog.id.toString(),
    });
  }
}
