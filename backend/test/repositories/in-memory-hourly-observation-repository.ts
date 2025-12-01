/* eslint-disable @typescript-eslint/require-await */
import { HourlyObservationRepository } from "src/domain/weatherLog/application/repositories/hourly-observation-repository";
import { HourlyObservation } from "src/domain/weatherLog/enterprise/entities/hourly-observation";

export class InMemoryHourlyObservationRepository implements HourlyObservationRepository {
  public observations: HourlyObservation[] = [];

  async create(observation: HourlyObservation): Promise<void> {
    this.observations.push(observation);
  }

  async findManyRecent(count: number): Promise<HourlyObservation[]> {
    const observations = this.observations.slice(0, count);
    return observations;
  }

  async findByDate(timestamp: Date): Promise<HourlyObservation | null> {
    const observation = this.observations.find(
      (obs) => obs.currentStats.timestamp.getTime() === timestamp.getTime()
    );

    if (!observation) return null;

    return observation;
  }
}
