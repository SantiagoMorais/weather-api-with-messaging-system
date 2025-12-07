import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { Result } from "src/core/result";
import { IObservationStats } from "../../../../core/interfaces/services/open-weather/observation-stats";

export type TFindCurrentForecastResponse = Result<
  DataNotFoundError,
  {
    currentForecast: IObservationStats[];
    id: string; // Entity ID
  }
>;
