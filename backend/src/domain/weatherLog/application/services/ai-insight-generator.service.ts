import { IObservationStats } from "src/core/interfaces/observation-stats";

export interface IAIInsightGeneratorPayload {
  weatherLogId: string | number;
  stats: Partial<IObservationStats>;
  metadata?: unknown;
}

export abstract class AIInsightGenerator {
  abstract generateInsight(
    payload: IAIInsightGeneratorPayload
  ): Promise<string>;
}
