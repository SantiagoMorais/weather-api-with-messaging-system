import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { Result } from "src/core/result";
import { HourlyObservation } from "src/domain/weatherLog/enterprise/entities/hourly-observation.entity";

export interface IFindHourlyObservationByDateRequest {
  timeStamp: Date;
}

export type TFindHourlyObservationByDateUseCase = Result<
  DataNotFoundError,
  { hourlyObservation: HourlyObservation }
>;
