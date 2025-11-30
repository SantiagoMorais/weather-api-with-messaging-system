import { DataAlreadyExistsError } from "src/core/errors/data-already-exists-error";
import { ILocation } from "../../location";
import { IObservationStats } from "../../observation-stats";
import { Result } from "src/core/result";
import { HourlyObservation } from "src/domain/weatherLog/enterprise/entities/hourly-observation";

export interface ICreateHourlyObservationUseCaseRequest {
  stats: IObservationStats;
  location: ILocation;
}

export type TCreateHourlyObservationUseCaseResponse = Result<
  DataAlreadyExistsError,
  {
    hourlyObservation: HourlyObservation;
  }
>;
