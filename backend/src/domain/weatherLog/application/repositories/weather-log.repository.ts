import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { WeatherLog } from "../../enterprise/entities/weather-log.entity";
import { ILocation } from "src/core/interfaces/services/open-weather/location";

export abstract class WeatherLogRepository {
  abstract findById(id: UniqueEntityId): Promise<WeatherLog | null>;
  abstract save(weatherLog: WeatherLog): Promise<void>;
  abstract findManyRecent(amount: number): Promise<WeatherLog[]>;
  abstract findMostRecent(): Promise<WeatherLog | null>;
  abstract findByHour(
    date: Date,
    location: ILocation
  ): Promise<WeatherLog | null>;
  abstract expirePreviousForecast(location: ILocation): Promise<void>;
  abstract findMostRecentByLocation(
    location: ILocation
  ): Promise<WeatherLog | null>;
}
