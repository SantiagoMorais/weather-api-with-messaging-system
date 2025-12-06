/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from "@nestjs/common";
import {
  AIInsightGenerator,
  IAIInsightGeneratorPayload,
} from "src/domain/weatherLog/application/services/ai-insight-generator.service";

@Injectable()
export class MockAIInsightGenerator implements AIInsightGenerator {
  async generateInsight(payload: IAIInsightGeneratorPayload): Promise<string> {
    const risk =
      payload.stats.precipitationProbability > 50
        ? "Risco de chuva identificado."
        : "Clima ideal.";

    return `[MOCK INSIGHT] Análise simulada para o log ${payload.weatherLogId.toString()}. ${risk}`;
  }
}
