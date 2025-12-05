import { DataAlreadyExistsError } from "src/core/errors/data-already-exists-error";

import { makeWeatherLog } from "test/factories/make-weather-log";
import { InMemoryWeatherLogRepository } from "test/repositories/in-memory-weather-log-repository";
import { ReceiveWeatherLogUseCase } from "./receive-weather-log.usecase";

let inMemoryWeatherLogRepository: InMemoryWeatherLogRepository;
let sut: ReceiveWeatherLogUseCase;

describe("ReceiveWeatherLog use case", () => {
  beforeEach(() => {
    inMemoryWeatherLogRepository = new InMemoryWeatherLogRepository();
    sut = new ReceiveWeatherLogUseCase(inMemoryWeatherLogRepository);
  });

  it("should be able to create a recent weather log", async () => {
    const weatherLog = makeWeatherLog();

    const result = await sut.execute(weatherLog);

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryWeatherLogRepository.weatherLogs).toHaveLength(1);
  });

  it("should not be able to create two observations at once", async () => {
    const firstWeatherLog = makeWeatherLog({
      createdAt: new Date(2025, 0, 10),
    });
    inMemoryWeatherLogRepository.weatherLogs.push(firstWeatherLog);
    const secondWeatherLog = makeWeatherLog({
      createdAt: new Date(2025, 0, 10),
    });

    const duplicateObservationAttemptResult =
      await sut.execute(secondWeatherLog);

    expect(duplicateObservationAttemptResult.isFailure()).toBe(true);
    expect(duplicateObservationAttemptResult.value).toBeInstanceOf(
      DataAlreadyExistsError
    );
  });

  it("should clean the current forecast of the last weather log before adding a new one", async () => {
    const oldWeatherLogPayload = makeWeatherLog({
      createdAt: new Date(2025, 11, 10),
    });
    inMemoryWeatherLogRepository.weatherLogs.push(oldWeatherLogPayload);

    const newWeatherLogPayload = makeWeatherLog({
      createdAt: new Date(2025, 11, 11),
    });

    await sut.execute(newWeatherLogPayload);

    expect(inMemoryWeatherLogRepository.weatherLogs).toHaveLength(2);

    const logAfterCleanup = await inMemoryWeatherLogRepository.findById(
      oldWeatherLogPayload.id
    );

    expect(logAfterCleanup?.currentForecastStats).toEqual([]);
  });
});
