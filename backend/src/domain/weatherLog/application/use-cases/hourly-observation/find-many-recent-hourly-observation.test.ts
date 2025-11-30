import { InMemoryHourlyObservationRepository } from "test/repositories/in-memory-hourly-observation-repository";
import { FindManyRecentHourlyObservationUseCase } from "./find-many-hourly-observation-recent";
import { makeHourlyObservation } from "test/factories/make-hourly-observation";

let inMemoryHourlyObservationRepository: InMemoryHourlyObservationRepository;
let sut: FindManyRecentHourlyObservationUseCase;

describe("FindHourlyObservationByDate use case", () => {
  beforeEach(() => {
    inMemoryHourlyObservationRepository =
      new InMemoryHourlyObservationRepository();
    sut = new FindManyRecentHourlyObservationUseCase(
      inMemoryHourlyObservationRepository
    );
  });

  it("should be able to find many recent hourly", async () => {
    for (let i = 10; i < 20; i++) {
      const observation = makeHourlyObservation(
        {},
        new Date(`2025-11-${i}T10:00:00.000-03:00`)
      );
      await inMemoryHourlyObservationRepository.create(observation);
    }

    const result = await sut.execute({ count: 5 });

    expect(result.isSuccess()).toBe(true);
    expect(result.value.recentHourlyObservation).toHaveLength(5);
    expect(
      result.value.recentHourlyObservation[1].currentStats.timestamp
    ).toEqual(new Date("2025-11-11T10:00:00"));
  });

  it("should return an empty array when not containing observations", async () => {
    const result = await sut.execute({ count: 5 });

    expect(result.isSuccess()).toBe(true);
    expect(result.value.recentHourlyObservation).toHaveLength(0);
  });
});
