import { InMemoryWeatherLogRepository } from "test/repositories/in-memory-weather-log-repository";
import { FindCurrentHourlyObservationUseCase } from "./find-current-hourly-observation.usecase";
import { makeWeatherLog } from "test/factories/make-weather-log";

let inMemoryWeatherLogRepository: InMemoryWeatherLogRepository;
let sut: FindCurrentHourlyObservationUseCase;

describe("FindHourlyObservationByDate use case", () => {
  beforeEach(() => {
    inMemoryWeatherLogRepository = new InMemoryWeatherLogRepository();
    sut = new FindCurrentHourlyObservationUseCase(inMemoryWeatherLogRepository);
  });

  it("should be able to find a observation by date", async () => {
    const hourlyObservation = makeWeatherLog();
    await inMemoryWeatherLogRepository.save(hourlyObservation);

    const result = await sut.execute();

    expect(result.isSuccess()).toBe(true);
    expect(result.value).toEqual(
      expect.objectContaining({
        hourlyObservation: expect.any(Object),
      })
    );
  });

  it("should not be able to find a observation with a different date", async () => {
    const baseDate = new Date("2025-11-29T21:00:00");
    const differentDate = new Date("2025-11-30T21:00:00");
    const olderHourlyObservation = makeWeatherLog({ createdAt: baseDate });
    const newerHourlyObservation = makeWeatherLog({ createdAt: differentDate });
    await inMemoryWeatherLogRepository.save(olderHourlyObservation);
    await inMemoryWeatherLogRepository.save(newerHourlyObservation);

    const result = await sut.execute();

    expect(result.isSuccess()).toBe(true);
    expect(result.value).toEqual(
      expect.objectContaining({
        hourlyObservation: newerHourlyObservation.hourlyObservationStats,
      })
    );
  });
});
