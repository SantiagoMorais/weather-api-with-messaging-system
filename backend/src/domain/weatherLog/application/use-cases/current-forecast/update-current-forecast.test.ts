import { InMemoryCurrentForecastRepository } from "test/repositories/in-memory-current-forecast-repository";
import { UpdateCurrentForecastUseCase } from "./update-current-forecast";
import { IObservationStats } from "src/core/interfaces/observation-stats";
import { IUpdateCurrentForecastRequest } from "src/core/interfaces/use-cases/weather-log/update-current-forecast-use-case";
import { CurrentForecast } from "src/domain/weatherLog/enterprise/entities/current-forecast";

let inMemoryCurrentForecastRepository: InMemoryCurrentForecastRepository;
let sut: UpdateCurrentForecastUseCase;

const createMockStat = (
  hourOffset: number,
  baseTemperature: number
): IObservationStats => {
  const baseDate = new Date("2025-11-29T21:00:00.000-03:00");
  const timestamp = new Date(baseDate.getTime() + hourOffset * 60 * 60 * 1000);

  return {
    timestamp: timestamp,
    temperature: baseTemperature + hourOffset * 0.5,
    isDay: hourOffset >= 6 && hourOffset <= 18,
    uvIndex:
      hourOffset >= 6 && hourOffset <= 18
        ? 5.0 - Math.abs(12 - hourOffset) / 2
        : 0.0,
    relativeHumidity: 70 + Math.floor(Math.random() * 20),
    apparentTemperature: baseTemperature + hourOffset * 0.6,
    precipitationProbability: Math.random() > 0.8 ? 30 : 5,
    precipitation: 0.0,
    rain: 0.0,
    cloudCover: 50 + Math.floor(Math.random() * 30),
    visibility: 15.0,
    windSpeed: 5.0 + Math.random() * 5,
    soilTemperature: 18.0 + hourOffset * 0.1,
    soilMoisture: 55.0,
  };
};

const generateForecastStats = (
  count: number,
  baseTemp: number
): IObservationStats[] => {
  const stats: IObservationStats[] = [];
  for (let i = 0; i < count; i++) {
    stats.push(createMockStat(i, baseTemp));
  }
  return stats;
};

describe("UpdateCurrentForecast use case", () => {
  beforeEach(() => {
    inMemoryCurrentForecastRepository = new InMemoryCurrentForecastRepository();
    sut = new UpdateCurrentForecastUseCase(inMemoryCurrentForecastRepository);
  });

  it("should perform an initial INSERT (UPSERT) when no forecast exists", async () => {
    const initialStats = generateForecastStats(5, 20.0);
    const request: IUpdateCurrentForecastRequest = {
      location: {
        latitude: -23.55,
        longitude: -46.63,
        timezone: "America/Sao_Paulo",
      },
      stats: initialStats,
    };

    const result = await sut.execute(request);

    expect(result.isSuccess()).toBe(true);
    expect(result.value).toEqual(
      expect.objectContaining({
        currentForecast: expect.any(Object),
      })
    );

    const forecastInRepo = inMemoryCurrentForecastRepository.forecast;

    expect(forecastInRepo).toBeInstanceOf(CurrentForecast);
    expect(forecastInRepo?.forecast24h).toHaveLength(5);
    expect(forecastInRepo?.forecast24h[0].temperature).toBe(20.0);
  });

  it("should perform a subsequent UPDATE (UPSERT) when a forecast already exists", async () => {
    const existingStats = generateForecastStats(5, 15.0);
    const existingRequest: IUpdateCurrentForecastRequest = {
      location: {
        latitude: -23.55,
        longitude: -46.63,
        timezone: "America/Sao_Paulo",
      },
      stats: existingStats,
    };

    await sut.execute(existingRequest);

    const newStats = generateForecastStats(8, 30.0); // Different temperature
    const newRequest: IUpdateCurrentForecastRequest = {
      location: {
        latitude: -23.55,
        longitude: -46.63,
        timezone: "America/Sao_Paulo",
      },
      stats: newStats,
    };

    const result = await sut.execute(newRequest);
    expect(result.isSuccess()).toBe(true);

    const forecastInRepo = inMemoryCurrentForecastRepository.forecast;

    expect(forecastInRepo).toBeInstanceOf(CurrentForecast);
    expect(forecastInRepo?.forecast24h[0].temperature).toBe(30.0);
    expect(forecastInRepo?.forecast24h).toHaveLength(8);
  });
});
