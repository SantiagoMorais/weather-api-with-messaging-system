/* eslint-disable @typescript-eslint/require-await */
import { CurrentForecastRepository } from "src/domain/weatherLog/application/repositories/current-forecasts.repository";
import { CurrentForecast } from "src/domain/weatherLog/enterprise/entities/current-forecast.entity";

export class InMemoryCurrentForecastRepository implements CurrentForecastRepository {
  public forecast: CurrentForecast | null = null;

  async update(forecast: CurrentForecast): Promise<void> {
    this.forecast = forecast;
  }

  async findCurrent(): Promise<CurrentForecast | null> {
    return this.forecast;
  }
}
