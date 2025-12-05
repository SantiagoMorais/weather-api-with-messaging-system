/* eslint-disable @typescript-eslint/require-await */
import { WeatherLog } from "src/domain/weatherLog/enterprise/entities/weather-log.entity";
import { WeatherLogRepository } from "src/domain/weatherLog/application/repositories/weather-log.repository";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";

export class InMemoryWeatherLogRepository implements WeatherLogRepository {
  public weatherLogs: WeatherLog[] = [];

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

  async findByDate(date: Date): Promise<WeatherLog | null> {
    const log = this.weatherLogs.find(
      (l) => l.createdAt.getTime() === date.getTime()
    );
    if (!log) return null;
    return log;
  }
}
