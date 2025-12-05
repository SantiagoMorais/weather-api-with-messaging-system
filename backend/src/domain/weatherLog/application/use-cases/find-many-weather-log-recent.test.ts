import { InMemoryWeatherLogRepository } from "test/repositories/in-memory-weather-log-repository";
import { FindManyWeatherLogRecentUseCase } from "./find-many-weather-log-recent.usecase";
import { makeWeatherLog } from "test/factories/make-weather-log";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";

let inMemoryWeatherLogRepository: InMemoryWeatherLogRepository;
let sut: FindManyWeatherLogRecentUseCase;

describe("FindManyWeatherLogRecentUseCase use case", () => {
  beforeEach(() => {
    inMemoryWeatherLogRepository = new InMemoryWeatherLogRepository();
    sut = new FindManyWeatherLogRecentUseCase(inMemoryWeatherLogRepository);
  });

  it("should be able to return the recent weather log", async () => {
    for (let i = 0; i < 10; i++) {
      const weatherLog = makeWeatherLog({}, new UniqueEntityId(i.toString()));
      inMemoryWeatherLogRepository.weatherLogs.push(weatherLog);
    }

    const result = await sut.execute({ count: 5 });

    expect(result.isSuccess()).toBe(true);
    expect(result.value?.weatherLogs).toHaveLength(5);

    const resultThatExceeds = await sut.execute({ count: 20 });

    expect(resultThatExceeds.isSuccess()).toBe(true);
    expect(resultThatExceeds.value?.weatherLogs).toHaveLength(10);
  });
});
