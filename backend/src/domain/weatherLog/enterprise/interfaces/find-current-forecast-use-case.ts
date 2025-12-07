import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { Result } from "src/core/result";
import { IObservationStats } from "../api/observation-stats";

export type TFindCurrentForecastResponse = Result<
  DataNotFoundError,
  {
    currentForecast: IObservationStats[];
    id: string; // Entity ID
  }
>;
