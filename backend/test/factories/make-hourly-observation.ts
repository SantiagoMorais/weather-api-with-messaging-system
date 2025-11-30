import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { IHourlyObservationProps } from "src/core/interfaces/entities/hourly-observation";
import { HourlyObservation } from "src/domain/weatherLog/enterprise/entities/hourly-observation";

export const makeHourlyObservation = (
  override: Partial<IHourlyObservationProps> = {},
  timestamp?: Date,
  id?: UniqueEntityId
) => {
  const observation = HourlyObservation.create(
    {
      location: {
        latitude: -23.5505,
        longitude: -46.6333,
        timezone: "America/Sao_Paulo",
      },
      stats: {
        timestamp: timestamp ?? new Date("2025-11-29T21:00:00.000-03:00"),
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
      },
      ...override,
    },
    id
  );

  return observation;
};
