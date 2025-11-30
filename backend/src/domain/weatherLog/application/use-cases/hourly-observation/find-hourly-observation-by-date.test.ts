import { InMemoryHourlyObservationRepository } from "test/repositories/in-memory-hourly-observation-repository";
import { FindHourlyObservationByDateUseCase } from "./find-hourly-observation-by-date";
import { makeHourlyObservation } from "test/factories/make-hourly-observation";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";

let inMemoryHourlyObservationRepository: InMemoryHourlyObservationRepository;
let sut: FindHourlyObservationByDateUseCase;

describe("FindHourlyObservationByDate use case", () => {
  beforeEach(() => {
    inMemoryHourlyObservationRepository =
      new InMemoryHourlyObservationRepository();
    sut = new FindHourlyObservationByDateUseCase(
      inMemoryHourlyObservationRepository
    );
  });

  it("should be able to find a observation by date", async () => {
    const baseDate = new Date("2025-11-29T21:00:00.000-03:00");
    const hourlyObservation = makeHourlyObservation({}, baseDate);
    await inMemoryHourlyObservationRepository.create(hourlyObservation);

    const result = await sut.execute({ timeStamp: baseDate });

    expect(result.isSuccess()).toBe(true);
    expect(result.value).toEqual(
      expect.objectContaining({
        hourlyObservation: expect.any(Object),
      })
    );
  });

  it("should not be able to find a observation with a different date", async () => {
    const baseDate = new Date("2025-11-29T21:00:00.000-03:00");
    const differentDate = new Date("2025-11-30T21:00:00.000-03:00");
    const hourlyObservation = makeHourlyObservation({}, baseDate);
    await inMemoryHourlyObservationRepository.create(hourlyObservation);

    const result = await sut.execute({ timeStamp: differentDate });

    expect(result.isFailure()).toBe(true);
    expect(result.value).toBeInstanceOf(DataNotFoundError);
  });
});
