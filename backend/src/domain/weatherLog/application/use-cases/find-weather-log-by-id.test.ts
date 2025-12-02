import { InMemoryWeatherLogRepository } from "test/repositories/in-memory-weather-log-repository";
import { FindWeatherLogByDateUseCase } from "./find-weather-log-by-id.usecase";
import { makeWeatherLog } from "test/factories/make-weather-log";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";

let inMemoryWeatherLogRepository: InMemoryWeatherLogRepository;
let sut: FindWeatherLogByDateUseCase;

describe("FindWeatherLogByDate use case", () => {
  beforeEach(() => {
    inMemoryWeatherLogRepository = new InMemoryWeatherLogRepository();
    sut = new FindWeatherLogByDateUseCase(inMemoryWeatherLogRepository);
  });

  it("should be able to return a weather log by date", async () => {
    for (let i = 0; i < 10; i++) {
      const weatherLog = makeWeatherLog({
        createdAt: new Date(new Date(2025, 0, 1).setDate(1 + i)),
      });
      inMemoryWeatherLogRepository.weatherLogs.push(weatherLog);
    }

    const result = await sut.execute({ date: new Date(2025, 0, 5) });

    console.log(inMemoryWeatherLogRepository.weatherLogs[5]);

    expect(result.isSuccess()).toBe(true);
    expect(result.value).toEqual({
      weatherLog: expect.any(Object),
    });
  });

  it("should not return a weather log with a date that doesn't match", async () => {
    const firstDate = new Date(2025, 0, 1);
    const differentDate = new Date(2024, 3, 23);

    const weatherLog = makeWeatherLog({
      createdAt: firstDate,
    });
    inMemoryWeatherLogRepository.weatherLogs.push(weatherLog);

    const result = await sut.execute({ date: differentDate });

    expect(result.isFailure()).toBe(true);
    expect(result.value).toBeInstanceOf(DataNotFoundError);
    expect(inMemoryWeatherLogRepository.weatherLogs).toHaveLength(1);
  });
});
