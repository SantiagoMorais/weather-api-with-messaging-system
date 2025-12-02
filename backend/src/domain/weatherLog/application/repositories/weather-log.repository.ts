import { WeatherLog } from "../../enterprise/entities/weather-log.entity";

export abstract class WeatherLogRepository {
  abstract findById(id: string | number): Promise<WeatherLog | null>;
  abstract save(weatherLog: WeatherLog): Promise<void>;
  abstract findManyRecent(amount: number): Promise<WeatherLog[]>;
  abstract findByDate(date: Date): Promise<WeatherLog | null>;
}
