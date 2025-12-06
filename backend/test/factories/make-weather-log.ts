import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { IWeatherLogProps } from "src/core/interfaces/entities/weather-log-props";
import { IObservationStats } from "src/core/interfaces/services/open-weather/observation-stats";
import { WeatherLog } from "src/domain/weatherLog/enterprise/entities/weather-log.entity";

export const makeWeatherLog = (
  override: Partial<IWeatherLogProps> = {},
  id?: UniqueEntityId
) => {
  const baseStats: IObservationStats = {
    timestamp: new Date("2025-11-29T22:00:00.000-03:00"),
    temperature: 20.8,
    isDay: false,
    uvIndex: 0.0,
    relativeHumidity: 88,
    apparentTemperature: 21.5,
    precipitationProbability: 15,
    precipitation: 0.0,
    rain: 0.0,
    cloudCover: 55,
    visibility: 15.0,
    windSpeed: 8.5,
    soilTemperature: 18.2,
    soilMoisture: 58.0,
    ...override.currentForecastStats,
  };

  const weatherNotPersisted: IWeatherLogProps = {
    currentForecastStats: [baseStats],
    hourlyObservationStats: baseStats,
    createdAt: new Date(),
    location: {
      latitude: -23.5505,
      longitude: -46.6333,
      timezone: "America/Sao_Paulo",
      ...override.location,
    },
    ...override,
  };

  const weatherLog = WeatherLog.create(weatherNotPersisted, id);

  return weatherLog;
};
