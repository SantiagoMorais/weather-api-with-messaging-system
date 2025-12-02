import { InMemoryWeatherLogRepository } from "test/repositories/in-memory-weather-log-repository";
import { GenerateInsightForWeatherLogUseCase } from "./generate-insight-for-weather-log";
import { InMemoryAIInsightGeneratorService } from "test/services/in-memory-ai-insight-generator-service";
import { makeWeatherLog } from "test/factories/make-weather-log";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";

let inMemoryWeatherLogRepository: InMemoryWeatherLogRepository;
let inMemoryAIGeneratorService: InMemoryAIInsightGeneratorService;
let sut: GenerateInsightForWeatherLogUseCase;

describe("GenerateInsightForWeatherLog use case", () => {
  beforeEach(() => {
    inMemoryWeatherLogRepository = new InMemoryWeatherLogRepository();
    inMemoryAIGeneratorService = new InMemoryAIInsightGeneratorService();
    sut = new GenerateInsightForWeatherLogUseCase(
      inMemoryWeatherLogRepository,
      inMemoryAIGeneratorService
    );
  });

  it("should be able to generate a insight", async () => {
    const uniqueId = new UniqueEntityId();
    const weatherLog = makeWeatherLog({}, uniqueId);

    inMemoryWeatherLogRepository.weatherLogs.push(weatherLog);

    const result = await sut.execute({ weatherLogId: uniqueId.toString() });

    expect(result.isSuccess()).toBe(true);
    expect(result.value).toEqual(
      expect.objectContaining({
        weatherLog: expect.objectContaining({
          insight: expect.any(String),
        }),
      })
    );
  });

  it("should not be able to generate an insight with invalid id", async () => {
    const uniqueId = new UniqueEntityId();
    const differentId = new UniqueEntityId();
    const weatherLog = makeWeatherLog({}, uniqueId);

    inMemoryWeatherLogRepository.weatherLogs.push(weatherLog);

    const result = await sut.execute({ weatherLogId: differentId.toString() });

    expect(result.isFailure()).toBe(true);
    expect(result.value).toBeInstanceOf(DataNotFoundError);
    expect(inMemoryWeatherLogRepository.weatherLogs[0].insight).toEqual(
      undefined
    );
  });
});
