import { Result } from "src/core/result";
import { HourlyObservation } from "src/domain/weatherLog/enterprise/entities/hourly-observation";

export interface IFindManyRecentHourlyObservationRequest {
  count: number;
}

export type TFindManyRecentHourlyObservationUseCase = Result<
  { recentHourlyObservation: HourlyObservation[] },
  { recentHourlyObservation: HourlyObservation[] }
>;
