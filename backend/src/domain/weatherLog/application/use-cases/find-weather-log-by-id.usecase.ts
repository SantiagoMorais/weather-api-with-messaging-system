import { Injectable } from "@nestjs/common";
import { WeatherLogRepository } from "../repositories/weather-log.repository";
import {
  IFindWeatherLogByDateUseCaseRequest,
  TFindWeatherLogByDateUseCaseResponse,
} from "src/core/interfaces/use-cases/weather-log/find-weather-log-by-date-use-case";
import { failure, success } from "src/core/result";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";

@Injectable()
export class FindWeatherLogByDateUseCase {
  constructor(private weatherLogRepository: WeatherLogRepository) {}

  async execute({
    date,
  }: IFindWeatherLogByDateUseCaseRequest): Promise<TFindWeatherLogByDateUseCaseResponse> {
    const weatherLog = await this.weatherLogRepository.findByDate(date);

    if (!weatherLog)
      return failure(
        new DataNotFoundError(
          `No weather log with the date ${date.getMonth()}/${date.getDay()}/${date.getFullYear()} - ${date.getHours()}h}`
        )
      );
    return success({ weatherLog });
  }
}
