import { AIGenerationFailedError } from "src/core/errors/ai-generation-failed-error";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { Result } from "src/core/result";
import { IPersistedWeatherLog } from "../../persisted-weather-log";

export interface IGenerateInsightForWeatherLogRequest {
  weatherLogId: string | number;
}

export type TGenerateInsightForWeatherLogResponse = Result<
  DataNotFoundError | AIGenerationFailedError,
  { weatherLog: IPersistedWeatherLog }
>;
