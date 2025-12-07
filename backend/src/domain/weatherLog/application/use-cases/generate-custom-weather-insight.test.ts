import { InMemoryWeatherLogRepository } from "test/repositories/in-memory-weather-log-repository";
import { GenerateCustomWeatherInsight } from "./generate-custom-weather-insight";
import { makeWeatherLog } from "test/factories/make-weather-log";

let inMemoryWeatherLogRepository: InMemoryWeatherLogRepository;
let sut: GenerateCustomWeatherInsight;

describe("GenerateCustomWeatherInsight use case", () => {
  beforeAll(() => {
    inMemoryWeatherLogRepository = new InMemoryWeatherLogRepository();
    sut = new GenerateCustomWeatherInsight(inMemoryWeatherLogRepository);
  });

  it("should be able to generate custom weather insight", async () => {
    const weatherLog = makeWeatherLog();
    inMemoryWeatherLogRepository.weatherLogs.push(weatherLog);

    const response = await sut.execute();

    expect(response.isSuccess()).toBe(true);
    expect(response.value).toEqual(
      expect.objectContaining({
        insights: expect.any(Object),
      })
    );
  });
});
