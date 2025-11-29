import { ILocation } from "../location";
import { IObservationStats } from "../observation-stats";
import { ITimestamps } from "../timestamps";

export interface IHourlyObservationProps extends ITimestamps {
  stats: IObservationStats;
  location: ILocation;
}
