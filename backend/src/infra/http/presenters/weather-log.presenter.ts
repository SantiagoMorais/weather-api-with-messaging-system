import { WeatherLog } from "src/domain/weatherLog/enterprise/entities/weather-log.entity";
import { ObservationStats } from "src/infra/database/mongoose/schemas/observation-stats.schema";
import { TObservationStats } from "../modules/weather-log/models/schemas/observation-stats.schema";
import { TWeatherLogControllerResponse } from "../modules/weather-log/models/schemas/weather-log-controller-request.schema";
import { ILocation } from "src/core/interfaces/services/open-weather/location";
import { TLocation } from "../modules/weather-log/models/schemas/location.schema";

export class WeatherLogPresenter {
  static toHTTP(weatherLog: WeatherLog): TWeatherLogControllerResponse {
    return {
      id: weatherLog.id.toString(),
      createdAt: weatherLog.createdAt,
      updatedAt: weatherLog.updatedAt,
      location: this.mapLocation(weatherLog.location),
      hourlyObservationStats: this.mapStats(weatherLog.hourlyObservationStats),
      currentForecastStats: weatherLog.currentForecastStats.map((stat) =>
        this.mapStats(stat)
      ),
      insight: weatherLog.insight,
    };
  }

  private static mapLocation(location: ILocation): TLocation {
    return {
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: location.timezone,
    };
  }

  private static mapStats(stats: ObservationStats): TObservationStats {
    return {
      timestamp: stats.timestamp,
      temperature: stats.temperature,
      isDay: stats.isDay,
      uvIndex: stats.uvIndex,
      relativeHumidity: stats.relativeHumidity,
      apparentTemperature: stats.apparentTemperature,
      precipitationProbability: stats.precipitationProbability,
      precipitation: stats.precipitation,
      rain: stats.rain,
      cloudCover: stats.cloudCover,
      visibility: stats.visibility,
      windSpeed: stats.windSpeed,
      soilTemperature: stats.soilTemperature,
      soilMoisture: stats.soilMoisture,
    };
  }
}
