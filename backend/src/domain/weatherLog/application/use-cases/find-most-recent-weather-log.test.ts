import { makeWeatherLog } from "test/factories/make-weather-log";
import { InMemoryWeatherLogRepository } from "test/repositories/in-memory-weather-log-repository";
import { FindMostRecentWeatherLogUseCase } from "./find-most-recent-weather-log.usecase";

let inMemoryWeatherLogRepository: InMemoryWeatherLogRepository;
let sut: FindMostRecentWeatherLogUseCase;

describe("FindWeatherLogByDate use case", () => {
  beforeEach(() => {
    inMemoryWeatherLogRepository = new InMemoryWeatherLogRepository();
    sut = new FindMostRecentWeatherLogUseCase(inMemoryWeatherLogRepository);
  });

  it("should be able to return a weather log by date", async () => {
    for (let i = 0; i < 10; i++) {
      const weatherLog = makeWeatherLog({
        createdAt: new Date(new Date(2025, 0, 1).setDate(1 + i)),
      });
      inMemoryWeatherLogRepository.weatherLogs.push(weatherLog);
    }

    const result = await sut.execute();

    expect(result.isSuccess()).toBe(true);
    expect(result.value).toEqual({
      weatherLog: expect.any(Object),
    });
  });
});
