import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { Result } from "src/core/result";
import { ICustomWeatherInsight } from "./custom-weather-insights";

export type TGenerateCustomWeatherInsightUseCaseResponse = Result<
  DataNotFoundError,
  { insights: ICustomWeatherInsight }
>;
