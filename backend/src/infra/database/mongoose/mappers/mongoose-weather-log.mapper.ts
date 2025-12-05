import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { ILocation } from "src/core/interfaces/location";
import { WeatherLog as DomainWeatherLog } from "src/domain/weatherLog/enterprise/entities/weather-log.entity";
import { WeatherLogDocument } from "../schemas/weather-log.schema";

export class MongooseWeatherLogMapper {
  static toDomain(raw: WeatherLogDocument): DomainWeatherLog {
    if (!raw._id) {
      throw new Error(
        "Mongoose Document must have an _id to be mapped to a Domain Entity."
      );
    }

    return DomainWeatherLog.create(
      {
        hourlyObservationStats: raw.hourlyObservationStats,
        currentForecastStats: raw.currentForecastStats,
        location: raw.location as ILocation,
        insight: raw.insight,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw._id.toString())
    );
  }

  static toMongoose(weatherLog: DomainWeatherLog) {
    return {
      _id: weatherLog.id.toString(),
      hourlyObservationStats: weatherLog.hourlyObservationStats,
      currentForecastStats: weatherLog.currentForecastStats,
      location: weatherLog.location,
      insight: weatherLog.insight,
      createdAt: weatherLog.createdAt,
      updatedAt: weatherLog.updatedAt,
    };
  }
}
