import type { IObservationStats } from "./observation-stats";

export interface IHourlyObservationWithId {
  hourlyObservation: IObservationStats;
  id: string;
}
