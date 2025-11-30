import { Result } from "src/core/result";
import { HourlyObservation } from "src/domain/weatherLog/enterprise/entities/hourly-observation";

export interface IFindManyHourlyObservationRecentRequest {
  count: number;
}

export type TFindManyHourlyObservationRecentUseCase = Result<
  void,
  { recentHourlyObservation: HourlyObservation[] }
>;
