/* eslint-disable @typescript-eslint/require-await */
import { WeatherLog } from "src/domain/weatherLog/enterprise/entities/weather-log.entity";
import { WeatherLogRepository } from "src/domain/weatherLog/gateways/weather-log.repository";

export class InMemoryWeatherLogRepository implements WeatherLogRepository {
  public weatherLogs: WeatherLog[] = [];

  async findById(id: string | number): Promise<WeatherLog | null> {
    const weatherLog = this.weatherLogs.find((w) => w.id.toString() === id);

    if (!weatherLog) return null;

    return weatherLog;
  }

  async save(weatherLog: WeatherLog): Promise<void> {
    this.weatherLogs.push(weatherLog);
  }
}
