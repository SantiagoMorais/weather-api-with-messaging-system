import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { ILocation } from "src/core/interfaces/services/open-weather/location";
import { IObservationStats } from "src/core/interfaces/services/open-weather/observation-stats";

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
