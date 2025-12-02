import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { ICurrentForecastProps } from "src/core/interfaces/entities/current-forecast-props";
import { IObservationStats } from "src/core/interfaces/observation-stats";
import { DeepPartial } from "src/core/types/deep-partial";
import { CurrentForecast } from "src/domain/weatherLog/enterprise/entities/current-forecast.entity";

export const makeCurrentForecast = (
  override: DeepPartial<ICurrentForecastProps> = {},
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
    ...override.stats,
  };

  const arrayOfStats = (count = 5): IObservationStats[] =>
    Array.from({ length: count }, (_, i) => ({
      ...baseStats,
      timestamp: new Date(`2025-11-28T1${i}:00:00.000-03:00`),
      temperature: baseStats.temperature + i,
    }));

  const currentForecast = CurrentForecast.create(
    {
      location: {
        latitude: -23.5505,
        longitude: -46.6333,
        timezone: "America/Sao_Paulo",
        ...override.location,
      },
      stats: arrayOfStats(),
    },
    id
  );

  return currentForecast;
};
