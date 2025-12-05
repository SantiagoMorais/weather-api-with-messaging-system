import { Injectable } from "@nestjs/common";
import { DomainEvents } from "src/core/events/domain-events";
import { WeatherLogCreatedEvent } from "../../enterprise/events/weather-log-created.event";
import { WeatherLogRepository } from "../repositories/weather-log.repository";
import {
  AIInsightGenerator,
  IAIInsightGeneratorPayload,
} from "../services/ai-insight-generator.service";

@Injectable()
export class OnWeatherLogCreated {
  constructor(
    private weatherLogRepository: WeatherLogRepository,
    private aiInsightGenerator: AIInsightGenerator
  ) {
    this.setupSubscriptions();
  }

  private setupSubscriptions(): void {
    DomainEvents.register((event) => {
      this.handle(event as WeatherLogCreatedEvent).catch(console.error);
    }, WeatherLogCreatedEvent.name);
  }

  private async handle(event: WeatherLogCreatedEvent): Promise<void> {
    const { weatherLog } = event;
    let insight: string | null = null;
    const logId = weatherLog.id;

    const aiPayload: IAIInsightGeneratorPayload = {
      stats: weatherLog.hourlyObservationStats,
      location: weatherLog.location,
      weatherLogId: logId,
    };

    try {
      console.info(
        `[AI] Generating domain insight to WeatherLog ${logId.toString()}`
      );
      insight = await this.aiInsightGenerator.generateInsight(aiPayload);
      console.log(
        `[AI] Insight successfully generated to ${logId.toString()}.`
      );
    } catch (error) {
      console.error(
        `[AI ERROR] Fail to generate insight to ${logId.toString()}. The log will be saved with a null insight`,
        error
      );
      insight = null;
    }

    weatherLog.insight = insight;

    await this.weatherLogRepository.save(weatherLog);
  }
}
