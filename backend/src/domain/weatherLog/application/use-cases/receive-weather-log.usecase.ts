import { Injectable } from "@nestjs/common";
import { DataAlreadyExistsError } from "src/core/errors/data-already-exists-error";
import {
  IReceiveWeatherLogRequest,
  TReceiveWeatherLogResponse,
} from "src/domain/weatherLog/enterprise/interfaces/receive-weather-log-use-case";
import { failure, success } from "src/core/result";
import { formatDateToString } from "src/utils/format-date-to-string";
import { WeatherLog } from "../../enterprise/entities/weather-log.entity";
import { WeatherLogRepository } from "../repositories/weather-log.repository";

@Injectable()
export class ReceiveWeatherLogUseCase {
  constructor(private weatherLogRepository: WeatherLogRepository) {}

  async execute(
    data: IReceiveWeatherLogRequest
  ): Promise<TReceiveWeatherLogResponse> {
    const { createdAt, location } = data;

    const lastLog =
      await this.weatherLogRepository.findMostRecentByLocation(location);

    if (lastLog) {
      const sameHour =
        lastLog.createdAt.getHours() === createdAt.getHours() &&
        lastLog.createdAt.getDate() === createdAt.getDate() &&
        lastLog.createdAt.getMonth() === createdAt.getMonth() &&
        lastLog.createdAt.getFullYear() === createdAt.getFullYear();

      if (sameHour) {
        return failure(
          new DataAlreadyExistsError(
            `Hourly Observation with timestamp ${formatDateToString(createdAt)} already registered.`
          )
        );
      }
    }

    await this.weatherLogRepository.expirePreviousForecast(data.location);

    const weatherLog = WeatherLog.create(data);
    await this.weatherLogRepository.save(weatherLog);

    return success({ weatherLog });
  }
}
