import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { IObservationStats } from "../../enterprise/api/observation-stats";
import { ILocation } from "../../enterprise/api/location";

export interface IAIInsightGeneratorPayload {
  weatherLogId: UniqueEntityId;
  stats: IObservationStats;
  location: ILocation;
}

export abstract class AIInsightGenerator {
  abstract generateInsight(
    payload: IAIInsightGeneratorPayload
  ): Promise<string>;
}
