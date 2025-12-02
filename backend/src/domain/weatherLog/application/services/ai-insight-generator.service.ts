import { ILocation } from "src/core/interfaces/location";
import { IObservationStats } from "src/core/interfaces/observation-stats";

export interface IAIInsightGeneratorPayload {
  weatherLogId: string | number;
  stats: IObservationStats;
  location: ILocation;
}

export abstract class AIInsightGenerator {
  abstract generateInsight(
    payload: IAIInsightGeneratorPayload
  ): Promise<string>;
}
