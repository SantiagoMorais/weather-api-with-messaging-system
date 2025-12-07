import { WeatherLog as DomainWeatherLog } from "src/domain/weatherLog/enterprise/entities/weather-log.entity";
import { WeatherLogDocument } from "../schemas/weather-log.schema";
import { IToMongooseWeatherLogResult } from "../interfaces/to-mongoose-weather-log-result";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { ILocation } from "src/domain/weatherLog/enterprise/api/location";

export class MongooseWeatherLogMapper {
  static toDomain(raw: WeatherLogDocument): DomainWeatherLog {
    return DomainWeatherLog.create(
      {
        hourlyObservationStats: raw.hourlyObservationStats,
        currentForecastStats: raw.currentForecastStats,
        location: raw.location as ILocation,
        insight: raw.insight,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id)
    );
  }

  static toMongoose(entity: DomainWeatherLog): IToMongooseWeatherLogResult {
    return {
      id: entity.id.toString(),
      hourlyObservationStats: entity.hourlyObservationStats,
      currentForecastStats: entity.currentForecastStats,
      location: entity.location,
      insight: entity.insight,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
