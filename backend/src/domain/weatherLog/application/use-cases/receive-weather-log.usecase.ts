import { Injectable } from "@nestjs/common";
import { DataAlreadyExistsError } from "src/core/errors/data-already-exists-error";
import {
  IReceiveWeatherLogRequest,
  TReceiveWeatherLogResponse,
} from "src/core/interfaces/use-cases/weather-log/receive-weather-log-use-case";
import { failure, success } from "src/core/result";
import { formatDateToString } from "src/utils/format-date-to-string";
import { WeatherLog } from "../../enterprise/entities/weather-log.entity";
import { WeatherLogRepository } from "../repositories/weather-log.repository";

@Injectable()
export class ReceiveWeatherLogUseCase {
  constructor(private weatherLogRepository: WeatherLogRepository) {}

  async execute({
    currentForecastStats,
    hourlyObservationStats,
    location,
    createdAt,
  }: IReceiveWeatherLogRequest): Promise<TReceiveWeatherLogResponse> {
    const weatherLogAlreadyExists =
      await this.weatherLogRepository.findByDate(createdAt);

    if (weatherLogAlreadyExists)
      return failure(
        new DataAlreadyExistsError(
          `Hourly Observation with timestamp ${formatDateToString(createdAt)} already registered.`
        )
      );

    const previousLog = await this.weatherLogRepository.findMostRecentLog();
    if (previousLog) {
      previousLog.currentForecastStats = [];
      await this.weatherLogRepository.save(previousLog);
    }

    const weatherLog = WeatherLog.create({
      location,
      currentForecastStats,
      hourlyObservationStats,
    });

    await this.weatherLogRepository.save(weatherLog);

    return success({
      currentForecast: weatherLog.currentForecastStats,
      hourlyObservation: weatherLog.hourlyObservationStats,
    });
  }
}
