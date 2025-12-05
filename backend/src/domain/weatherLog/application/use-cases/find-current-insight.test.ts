import { InMemoryWeatherLogRepository } from "test/repositories/in-memory-weather-log-repository";
import { makeWeatherLog } from "test/factories/make-weather-log";
import { FindInsightUseCase } from "./find-current-insight.usecase";

let inMemoryWeatherLogRepository: InMemoryWeatherLogRepository;
let sut: FindInsightUseCase;

describe("FindCurrentInsight use case", () => {
  beforeEach(() => {
    inMemoryWeatherLogRepository = new InMemoryWeatherLogRepository();
    sut = new FindInsightUseCase(inMemoryWeatherLogRepository);
  });

  it("should be able to find the most recent insight", async () => {
    const weatherLog = makeWeatherLog();
    await inMemoryWeatherLogRepository.save(weatherLog);

    const result = await sut.execute();

    expect(result.isSuccess()).toBe(true);
  });
});
