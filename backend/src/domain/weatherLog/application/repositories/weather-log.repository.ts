import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { WeatherLog } from "../../enterprise/entities/weather-log.entity";

export abstract class WeatherLogRepository {
  abstract findById(id: UniqueEntityId): Promise<WeatherLog | null>;
  abstract save(weatherLog: WeatherLog): Promise<void>;
  abstract findManyRecent(amount: number): Promise<WeatherLog[]>;
  abstract findByDate(date: Date): Promise<WeatherLog | null>;
  abstract findMostRecentLog(): Promise<WeatherLog | null>;
}
