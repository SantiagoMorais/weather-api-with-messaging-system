import { CurrentForecast } from "src/domain/weatherLog/enterprise/entities/current-forecast";
import { CurrentForecastRepository } from "../../repositories/current-forecasts-repository";
import {
  IUpdateCurrentForecastRequest,
  IUpdateCurrentForecastResponse,
} from "src/core/interfaces/use-cases/weather-log/update-current-forecast-use-case";
import { success } from "src/core/result";

export class UpdateCurrentForecastUseCase {
  constructor(private currentForecastRepository: CurrentForecastRepository) {}

  async execute(
    currentForecast: IUpdateCurrentForecastRequest
  ): Promise<IUpdateCurrentForecastResponse> {
    const forecast = CurrentForecast.create(currentForecast);

    await this.currentForecastRepository.update(forecast);

    return success({ currentForecast: forecast });
  }
}
