import { HourlyObservation } from "../../enterprise/entities/hourly-observation";

export abstract class HourlyObservationRepository {
  abstract create(observation: HourlyObservation): Promise<void>;
  abstract findManyRecent(count: number): Promise<HourlyObservation[]>;
  abstract findByDate(timestamp: Date): Promise<HourlyObservation | null>;
}
