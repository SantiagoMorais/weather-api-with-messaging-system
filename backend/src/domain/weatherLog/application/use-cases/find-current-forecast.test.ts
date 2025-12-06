import { IObservationStats } from "src/core/interfaces/services/open-weather/observation-stats";
import { makeWeatherLog } from "test/factories/make-weather-log";
import { InMemoryWeatherLogRepository } from "test/repositories/in-memory-weather-log-repository";
import { FindCurrentForecastUseCase } from "./find-current-forecast.usecase";

let inMemoryWeatherLogRepository: InMemoryWeatherLogRepository;
let sut: FindCurrentForecastUseCase;

describe("FindCurrentForecast use case", () => {
  beforeEach(() => {
    inMemoryWeatherLogRepository = new InMemoryWeatherLogRepository();
    sut = new FindCurrentForecastUseCase(inMemoryWeatherLogRepository);
  });

  it("should be able to find the current forecast", async () => {
    const firstForecast = makeWeatherLog({
      location: {
        latitude: 54.1234,
        longitude: -15.6789,
        timezone: "Europe/London",
      },
    });
    await inMemoryWeatherLogRepository.save(firstForecast);

    const result = await sut.execute();
    expect(result.isSuccess()).toBe(true);

    const { currentForecast } = result.value as {
      currentForecast: IObservationStats[];
    };
    expect(currentForecast).toHaveLength(1);
  });
});
