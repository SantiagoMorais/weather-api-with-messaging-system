import { TFindCurrentForecastResponse } from "src/core/interfaces/use-cases/weather-log/find-current-forecast-use-case";
import { CurrentForecastRepository } from "../../repositories/current-forecasts-repository";
import { failure, success } from "src/core/result";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";

export class FindCurrentForecastUseCase {
  constructor(private currentForecastRepository: CurrentForecastRepository) {}

  async execute(): Promise<TFindCurrentForecastResponse> {
    const currentForecast = await this.currentForecastRepository.findCurrent();

    if (!currentForecast)
      return failure(
        new DataNotFoundError("Current forecast was not created yet.")
      );

    return success({ currentForecast });
  }
}
