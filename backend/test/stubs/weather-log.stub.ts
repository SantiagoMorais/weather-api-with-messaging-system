import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { TWeatherLogControllerResponse } from "src/infra/http/modules/weather-log/models/schemas/weather-log-controller-request.schema";
import { makeWeatherLog } from "test/factories/make-weather-log";

export const weatherLogStub = ({
  createdAt,
}: {
  createdAt?: Date;
} = {}): TWeatherLogControllerResponse => {
  const weatherLogEntity = makeWeatherLog();
  const weatherDateCreation = createdAt ?? new Date("2025-12-04T12:00:00.000Z");
  const locationData = {
    latitude: -23.5505,
    longitude: -46.6333,
    timezone: "America/Sao_Paulo",
  };

  return {
    hourlyObservationStats: weatherLogEntity.hourlyObservationStats,
    currentForecastStats: weatherLogEntity.currentForecastStats,
    insight: weatherLogEntity.insight,
    location: locationData,
    createdAt: weatherDateCreation,
    _id: new UniqueEntityId().toString(),
  };
};
