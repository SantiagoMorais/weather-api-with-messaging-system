import { InMemoryCurrentForecastRepository } from "test/repositories/in-memory-current-forecast-repository";
import { ReceiveWeatherLogUseCase } from "./receive-weather-log.usecase";
import { InMemoryHourlyObservationRepository } from "test/repositories/in-memory-hourly-observation-repository";
import { makeHourlyObservation } from "test/factories/make-hourly-observation";
import { makeCurrentForecast } from "test/factories/make-current-forecast";
import { DataAlreadyExistsError } from "src/core/errors/data-already-exists-error";

let inMemoryHourlyObservationRepository: InMemoryHourlyObservationRepository;
let inMemoryCurrentForecastRepository: InMemoryCurrentForecastRepository;
let sut: ReceiveWeatherLogUseCase;

describe("ReceiveWeatherLog use case", () => {
  beforeEach(() => {
    inMemoryHourlyObservationRepository =
      new InMemoryHourlyObservationRepository();
    inMemoryCurrentForecastRepository = new InMemoryCurrentForecastRepository();
    sut = new ReceiveWeatherLogUseCase(
      inMemoryHourlyObservationRepository,
      inMemoryCurrentForecastRepository
    );
  });

  it("should be able to create a recent weather log", async () => {
    const { location, currentStats: hourlyObservationStats } =
      makeHourlyObservation();
    const { forecast24h: currentForecastStats } = makeCurrentForecast();

    const result = await sut.execute({
      currentForecastStats,
      hourlyObservationStats,
      location,
    });

    expect(result.isSuccess()).toBe(true);
  });

  it("should not be able to create two observations at once", async () => {
    const hourlyFirstCreation = makeHourlyObservation({
      stats: { timestamp: new Date("2025-11-29T21:00:00.000-03:00") },
    });
    await inMemoryHourlyObservationRepository.create(hourlyFirstCreation);

    const { forecast24h: currentForecastStats, location } =
      makeCurrentForecast();

    const duplicateObservationAttemptResult = await sut.execute({
      hourlyObservationStats: hourlyFirstCreation.currentStats,
      currentForecastStats,
      location,
    });

    expect(duplicateObservationAttemptResult.isFailure()).toBe(true);
    expect(duplicateObservationAttemptResult.value).toBeInstanceOf(
      DataAlreadyExistsError
    );
  });
});
