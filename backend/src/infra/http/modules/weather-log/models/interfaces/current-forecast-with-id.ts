import { TObservationStats } from "../schemas/observation-stats.schema";

export interface ICurrentForecastWithId {
  currentForecast: TObservationStats[];
  id: string;
}
