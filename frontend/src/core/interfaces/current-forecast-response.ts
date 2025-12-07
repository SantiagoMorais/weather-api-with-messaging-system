import type { IObservationStats } from "./observation-stats";

export interface ICurrentForecastResponse {
  id: string;
  currentForecast: IObservationStats[];
}
