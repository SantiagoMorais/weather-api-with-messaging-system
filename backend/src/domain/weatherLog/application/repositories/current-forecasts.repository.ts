import { CurrentForecast } from "../../enterprise/entities/current-forecast.entity";

export abstract class CurrentForecastRepository {
  abstract update(forecast: CurrentForecast): Promise<void>;
  abstract findCurrent(): Promise<CurrentForecast | null>;
}
