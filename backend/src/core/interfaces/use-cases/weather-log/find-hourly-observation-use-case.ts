import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { Result } from "src/core/result";
import { IObservationStats } from "../../observation-stats";

export type TFindHourlyObservationByDateResponse = Result<
  DataNotFoundError,
  { hourlyObservation: IObservationStats }
>;
