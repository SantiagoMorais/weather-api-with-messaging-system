import { TObservationStats } from "../schemas/observation-stats.schema";

export interface IHourlyObservationWithId {
  hourlyObservation: TObservationStats;
  id: string;
}
