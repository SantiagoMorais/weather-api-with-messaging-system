import { ILocation } from "../../location";
import { IObservationStats } from "../../observation-stats";
import { IHourlyObservationProps } from "../../entities/hourly-observation";
import { ICurrentForecastProps } from "../../entities/current-forecast-props";
import { Result } from "src/core/result";
import { DataAlreadyExistsError } from "src/core/errors/data-already-exists-error";

export interface IReceiveWeatherLogRequest {
  hourlyObservationStats: IObservationStats;
  currentForecastStats: IObservationStats[];
  location: ILocation;
}

export type TReceiveWeatherLogResponse = Result<
  DataAlreadyExistsError,
  {
    hourlyObservation: IHourlyObservationProps;
    currentForecast: ICurrentForecastProps;
  }
>;
