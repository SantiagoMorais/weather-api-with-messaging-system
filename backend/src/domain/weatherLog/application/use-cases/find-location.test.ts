import { InMemoryWeatherLogRepository } from "test/repositories/in-memory-weather-log-repository";
import { makeWeatherLog } from "test/factories/make-weather-log";
import { FindLocationUseCase } from "./find-location.usecase";

let inMemoryWeatherLogRepository: InMemoryWeatherLogRepository;
let sut: FindLocationUseCase;

describe("FindLocation use case", () => {
  beforeEach(() => {
    inMemoryWeatherLogRepository = new InMemoryWeatherLogRepository();
    sut = new FindLocationUseCase(inMemoryWeatherLogRepository);
  });

  it("should be able to find the location", async () => {
    const weatherLog = makeWeatherLog();
    await inMemoryWeatherLogRepository.save(weatherLog);

    const result = await sut.execute();

    expect(result.isSuccess()).toBe(true);
    expect(result.value).toEqual(
      expect.objectContaining({
        location: expect.any(Object),
      })
    );
  });
});
