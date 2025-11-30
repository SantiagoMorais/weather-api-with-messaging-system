import { Result } from "src/core/result";
import { ILocation } from "../../location";
import { IObservationStats } from "../../observation-stats";
import { CurrentForecast } from "src/domain/weatherLog/enterprise/entities/current-forecast";

export interface IUpdateCurrentForecastRequest {
  stats: IObservationStats[];
  location: ILocation;
}

export type TUpdateCurrentForecastResponse = Result<
  void,
  {
    currentForecast: CurrentForecast;
  }
>;
