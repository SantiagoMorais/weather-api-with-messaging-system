import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { Result } from "src/core/result";
import { IObservationStats } from "../api/observation-stats";

export type TFindHourlyObservationResponse = Result<
  DataNotFoundError,
  {
    hourlyObservation: IObservationStats;
    id: string; // Entity ID
  }
>;
