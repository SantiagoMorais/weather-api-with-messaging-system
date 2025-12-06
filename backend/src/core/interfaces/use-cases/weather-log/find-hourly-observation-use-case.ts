import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { Result } from "src/core/result";
import { IObservationStats } from "../../services/open-weather/observation-stats";

export type TFindHourlyObservationResponse = Result<
  DataNotFoundError,
  { hourlyObservation: IObservationStats; _id: string }
>;
