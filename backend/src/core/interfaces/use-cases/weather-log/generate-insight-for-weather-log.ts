import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { AIGenerationFailedError } from "src/core/errors/ai-generation-failed-error";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { Result } from "src/core/result";
import { WeatherLog } from "src/domain/weatherLog/enterprise/entities/weather-log.entity";

export interface IGenerateInsightForWeatherLogRequest {
  weatherLogId: UniqueEntityId;
}

export type TGenerateInsightForWeatherLogResponse = Result<
  DataNotFoundError | AIGenerationFailedError,
  { weatherLog: WeatherLog }
>;
