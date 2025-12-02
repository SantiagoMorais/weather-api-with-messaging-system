import { InMemoryCurrentForecastRepository } from "test/repositories/in-memory-current-forecast-repository";
import { FindCurrentForecastUseCase } from "./find-current-forecast.usecase";
import { makeCurrentForecast } from "test/factories/make-current-forecast";

let inMemoryCurrentForecastRepository: InMemoryCurrentForecastRepository;
let sut: FindCurrentForecastUseCase;

describe("FindCurrentForecast use case", () => {
  beforeEach(() => {
    inMemoryCurrentForecastRepository = new InMemoryCurrentForecastRepository();
    sut = new FindCurrentForecastUseCase(inMemoryCurrentForecastRepository);
  });

  it("should be able to find the current forecast", async () => {
    const firstForecast = makeCurrentForecast();
    await inMemoryCurrentForecastRepository.update(firstForecast);

    const result = await sut.execute();

    expect(result.isSuccess()).toBe(true);
  });
});
