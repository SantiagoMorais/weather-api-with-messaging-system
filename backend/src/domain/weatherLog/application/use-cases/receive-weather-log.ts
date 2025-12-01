import {
  IReceiveWeatherLogRequest,
  TReceiveWeatherLogResponse,
} from "src/core/interfaces/use-cases/weather-log/receive-weather-log-use-case";
import { CurrentForecastRepository } from "../repositories/current-forecasts-repository";
import { HourlyObservationRepository } from "../repositories/hourly-observation-repository";
import { HourlyObservation } from "../../enterprise/entities/hourly-observation";
import { CurrentForecast } from "../../enterprise/entities/current-forecast";
import { failure, success } from "src/core/result";
import { DataAlreadyExistsError } from "src/core/errors/data-already-exists-error";
import { formatDateToString } from "src/utils/formatDateToString";

export class ReceiveWeatherLogUseCase {
  constructor(
    private hourlyObservationRepository: HourlyObservationRepository,
    private currentForecastRepository: CurrentForecastRepository
  ) {}

  async execute({
    currentForecastStats,
    hourlyObservationStats,
    location,
  }: IReceiveWeatherLogRequest): Promise<TReceiveWeatherLogResponse> {
    const hourlyObservationTimestamp = hourlyObservationStats.timestamp;
    const observationAlreadyExists =
      await this.hourlyObservationRepository.findByDate(
        hourlyObservationTimestamp
      );

    if (observationAlreadyExists)
      return failure(
        new DataAlreadyExistsError(
          `Hourly Observation with timestamp ${formatDateToString(hourlyObservationTimestamp)} already registered.`
        )
      );

    const hourlyObservation = HourlyObservation.create({
      location,
      stats: hourlyObservationStats,
    });

    await this.hourlyObservationRepository.create(hourlyObservation);

    const currentForecast = CurrentForecast.create({
      location,
      stats: currentForecastStats,
    });

    await this.currentForecastRepository.update(currentForecast);

    return success({
      hourlyObservation: {
        createdAt: hourlyObservation.collectedAt,
        location: hourlyObservation.location,
        stats: hourlyObservation.currentStats,
        updatedAt: hourlyObservation.processedAt,
      },
      currentForecast: {
        createdAt: currentForecast.collectedAt,
        updatedAt: currentForecast.processedAt,
        location: currentForecast.location,
        stats: currentForecast.forecast24h,
      },
    });
  }
}
