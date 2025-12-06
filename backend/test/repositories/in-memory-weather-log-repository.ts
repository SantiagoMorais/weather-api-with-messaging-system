/* eslint-disable @typescript-eslint/require-await */
import { WeatherLog } from "src/domain/weatherLog/enterprise/entities/weather-log.entity";
import { WeatherLogRepository } from "src/domain/weatherLog/application/repositories/weather-log.repository";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { ILocation } from "src/core/interfaces/services/open-weather/location";

export class InMemoryWeatherLogRepository implements WeatherLogRepository {
  public weatherLogs: WeatherLog[] = [];

  async findMostRecentByLocation(
    location: ILocation
  ): Promise<WeatherLog | null> {
    const logs = this.weatherLogs
      .filter(
        (log) =>
          log.location.latitude === location.latitude &&
          log.location.longitude === location.longitude
      )
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return logs[0] ?? null;
  }

  async findByHour(
    date: Date,
    location: ILocation
  ): Promise<WeatherLog | null> {
    return (
      this.weatherLogs.find(
        (log) =>
          log.createdAt.getHours() === date.getHours() &&
          log.createdAt.getDate() === date.getDate() &&
          log.createdAt.getMonth() === date.getMonth() &&
          log.createdAt.getFullYear() === date.getFullYear() &&
          log.location.latitude === location.latitude &&
          log.location.longitude === location.longitude
      ) ?? null
    );
  }

  async findMostRecentLog(): Promise<WeatherLog | null> {
    if (this.weatherLogs.length === 0) return null;

    const sortedLogs = [...this.weatherLogs].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    return sortedLogs[0];
  }

  async findById(id: UniqueEntityId): Promise<WeatherLog | null> {
    const weatherLog = this.weatherLogs.find((w) => w.id.equals(id));
    if (!weatherLog) return null;
    return weatherLog;
  }

  async save(weatherLog: WeatherLog): Promise<void> {
    const itemIndex = this.weatherLogs.findIndex((item) =>
      item.id.equals(weatherLog.id)
    );

    if (itemIndex >= 0) {
      this.weatherLogs[itemIndex] = weatherLog;
    } else {
      this.weatherLogs.push(weatherLog);
    }
  }

  async findManyRecent(amount: number): Promise<WeatherLog[]> {
    const logs = this.weatherLogs.slice(0, amount);
    return logs;
  }

  async findMostRecent(): Promise<WeatherLog | null> {
    if (this.weatherLogs.length === 0) return null;

    return this.weatherLogs.reduce((latest, log) =>
      log.createdAt > latest.createdAt ? log : latest
    );
  }

  async expirePreviousForecast(location: ILocation): Promise<void> {
    const latest = this.weatherLogs
      .filter(
        (log) =>
          log.location.latitude === location.latitude &&
          log.location.longitude === location.longitude
      )
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];

    if (!latest) return;

    latest.currentForecastStats = [];

    await this.save(latest);
  }
}
