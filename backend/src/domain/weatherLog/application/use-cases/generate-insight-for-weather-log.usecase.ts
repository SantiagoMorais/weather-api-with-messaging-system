import { Injectable } from "@nestjs/common";
import { AIGenerationFailedError } from "src/core/errors/ai-generation-failed-error";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import {
  IGenerateInsightForWeatherLogRequest,
  TGenerateInsightForWeatherLogResponse,
} from "src/core/interfaces/use-cases/weather-log/generate-insight-for-weather-log";
import { failure, success } from "src/core/result";
import { WeatherLogRepository } from "../repositories/weather-log.repository";
import {
  AIInsightGenerator,
  IAIInsightGeneratorPayload,
} from "../services/ai-insight-generator.service";

@Injectable()
export class GenerateInsightForWeatherLogUseCase {
  constructor(
    private weatherLogRepository: WeatherLogRepository,
    private readonly aiService: AIInsightGenerator
  ) {}

  async execute({
    weatherLogId,
  }: IGenerateInsightForWeatherLogRequest): Promise<TGenerateInsightForWeatherLogResponse> {
    const weatherLog = await this.weatherLogRepository.findById(weatherLogId);

    if (!weatherLog)
      return failure(
        new DataNotFoundError(`WeatherLog ${weatherLogId} not found`)
      );

    const payload: IAIInsightGeneratorPayload = {
      stats: {
        temperature: weatherLog.hourlyObservationStats.temperature,
        relativeHumidity: weatherLog.hourlyObservationStats.relativeHumidity,
        windSpeed: weatherLog.hourlyObservationStats.windSpeed,
        rain: weatherLog.hourlyObservationStats.rain,
        apparentTemperature:
          weatherLog.hourlyObservationStats.apparentTemperature,
        cloudCover: weatherLog.hourlyObservationStats.cloudCover,
      },
      weatherLogId,
      metadata: {
        location: weatherLog.location,
        timestamp: weatherLog.hourlyObservationStats.timestamp,
      },
    };

    let insight: string;

    try {
      insight = await this.aiService.generateInsight(payload);
    } catch (error) {
      return failure(new AIGenerationFailedError(error));
    }

    weatherLog.insight = insight;
    await this.weatherLogRepository.save(weatherLog);

    return success({ weatherLog });
  }
}
