import { ILocation } from "../../location";
import { IObservationStats } from "../../observation-stats";
import { IHourlyObservationProps } from "../../entities/hourly-observation";
import { ICurrentForecastProps } from "../../entities/current-forecast-props";
import { Result } from "src/core/result";
import { DataAlreadyExistsError } from "src/core/errors/data-already-exists-error";

export interface IReceiveWeatherLogRequest {
  location: ILocation;
  hourlyObservationStats: IObservationStats;
  currentForecastStats: IObservationStats[];
}

export type TReceiveWeatherLogResponse = Result<
  DataAlreadyExistsError,
  {
    hourlyObservation: IHourlyObservationProps;
    currentForecast: ICurrentForecastProps;
  }
>;
