/* eslint-disable @typescript-eslint/require-await */
import {
  AIInsightGenerator,
  IAIInsightGeneratorPayload,
} from "src/domain/weatherLog/application/services/ai-insight-generator.service";

export class InMemoryAIInsightGeneratorService implements AIInsightGenerator {
  async generateInsight(payload: IAIInsightGeneratorPayload): Promise<string> {
    const insight = JSON.stringify(payload);

    return insight;
  }
}
