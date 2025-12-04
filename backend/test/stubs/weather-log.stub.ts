import { TWeatherLogControllerRequest } from "src/infra/http/modules/weather-log/models/schemas/weather-log-controller-request.schema";
import { makeWeatherLog } from "test/factories/make-weather-log";

export const weatherLogStub = (): TWeatherLogControllerRequest => {
  const weatherLogEntity = makeWeatherLog();
  const weatherDateCreation = new Date("2025-12-04T12:00:00.000Z");
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
  };
};
