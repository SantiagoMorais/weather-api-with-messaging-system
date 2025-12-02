// backend/src/domain/weatherLog/application/gateways/weather-log-repository.ts

import { WeatherLog } from "../enterprise/entities/weather-log";

export abstract class WeatherLogRepository {
  abstract findById(id: string | number): Promise<WeatherLog | null>;
  abstract save(weatherLog: WeatherLog): Promise<void>;
}
