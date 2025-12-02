// backend/src/domain/weatherLog/application/gateways/weather-log-repository.ts

import { IPersistedWeatherLog } from "src/core/interfaces/persisted-weather-log";

export abstract class WeatherLogRepository {
  abstract findById(id: string | number): Promise<IPersistedWeatherLog | null>;
  abstract save(weatherLog: IPersistedWeatherLog): Promise<void>;
}
