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

  async execute(
    data: IReceiveWeatherLogRequest
  ): Promise<TReceiveWeatherLogResponse> {
    const { createdAt } = data;

    // 1. Verifica se já existe LOG no mesmo horário
    const existingAtSameHour =
      await this.weatherLogRepository.findByHour(createdAt);
    if (existingAtSameHour) {
      return failure(
        new DataAlreadyExistsError(
          `Hourly Observation with timestamp ${formatDateToString(createdAt)} already registered.`
        )
      );
    }

    // 2. Pega o mais recente (de outro horário)
    const previousLog = await this.weatherLogRepository.findMostRecent();
    if (previousLog) {
      previousLog.currentForecastStats = [];
      await this.weatherLogRepository.save(previousLog);
    }

    // 3. Cria o novo
    const weatherLog = WeatherLog.create(data);
    await this.weatherLogRepository.save(weatherLog);

    return success({ weatherLog });
  }
}
