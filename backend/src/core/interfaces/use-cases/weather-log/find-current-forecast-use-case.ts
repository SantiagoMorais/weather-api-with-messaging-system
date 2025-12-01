import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { Result } from "src/core/result";
import { CurrentForecast } from "src/domain/weatherLog/enterprise/entities/current-forecast";

export type TFindCurrentForecastResponse = Result<
  DataNotFoundError,
  { currentForecast: CurrentForecast }
>;
