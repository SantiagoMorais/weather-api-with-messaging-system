import { ILocation } from "src/core/interfaces/services/open-weather/location";
import { WeatherLog as DomainWeatherLog } from "src/domain/weatherLog/enterprise/entities/weather-log.entity";
import { WeatherLogDocument } from "../schemas/weather-log.schema";
import { IToMongooseWeatherLogResult } from "../interfaces/to-mongoose-weather-log-result";

export class MongooseWeatherLogMapper {
  static toDomain(raw: WeatherLogDocument): DomainWeatherLog {
    return DomainWeatherLog.create({
      hourlyObservationStats: raw.hourlyObservationStats,
      currentForecastStats: raw.currentForecastStats,
      location: raw.location as ILocation,
      insight: raw.insight,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toMongoose(raw: DomainWeatherLog): IToMongooseWeatherLogResult {
    return {
      id: raw.id,
      hourlyObservationStats: raw.hourlyObservationStats,
      currentForecastStats: raw.currentForecastStats,
      location: raw.location,
      insight: raw.insight,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }
}
