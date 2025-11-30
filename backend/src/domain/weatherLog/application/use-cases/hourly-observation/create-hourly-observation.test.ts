import { InMemoryHourlyObservationRepository } from "test/repositories/in-memory-hourly-observation-repository";
import { CreateHourlyObservationUseCase } from "./create-hourly-observation";
import { ICreateHourlyObservationUseCaseRequest } from "src/core/interfaces/use-cases/weather-log/create-hourly-observation-use-case";
import { makeHourlyObservation } from "test/factories/make-hourly-observation";
import { DataAlreadyExistsError } from "src/core/errors/data-already-exists-error";

let inMemoryHourlyObservationRepository: InMemoryHourlyObservationRepository;
let sut: CreateHourlyObservationUseCase;

const mockedObservation: ICreateHourlyObservationUseCaseRequest = {
  location: {
    latitude: -23.5505,
    longitude: -46.6333,
    timezone: "America/Sao_Paulo",
  },
  stats: {
    timestamp: new Date("2025-11-29T21:00:00.000-03:00"),
    temperature: 20.8,
    isDay: false,
    uvIndex: 0.0,
    relativeHumidity: 88,
    apparentTemperature: 21.5,
    precipitationProbability: 15,
    precipitation: 0.0,
    rain: 0.0,
    cloudCover: 55,
    visibility: 15.0,
    windSpeed: 8.5,
    soilTemperature: 18.2,
    soilMoisture: 58.0,
  },
};

describe("CreateHourlyObservation use case", () => {
  beforeEach(() => {
    inMemoryHourlyObservationRepository =
      new InMemoryHourlyObservationRepository();
    sut = new CreateHourlyObservationUseCase(
      inMemoryHourlyObservationRepository
    );
  });

  it("should be able to create an hourly observation", async () => {
    const result = await sut.execute(mockedObservation);

    expect(result.isSuccess()).toBe(true);
    expect(result.value).toEqual({
      hourlyObservation: expect.objectContaining({
        props: expect.objectContaining({
          location: expect.any(Object),
          stats: expect.any(Object),
        }),
      }),
    });
    expect(inMemoryHourlyObservationRepository.observations).toHaveLength(1);
  });

  it("should not be able to create two observations at once", async () => {
    const firstCreation = makeHourlyObservation(mockedObservation);
    await inMemoryHourlyObservationRepository.create(firstCreation);

    const secondCreation = await sut.execute(mockedObservation);

    expect(secondCreation.isFailure()).toBe(true);
    expect(secondCreation.value).toBeInstanceOf(DataAlreadyExistsError);
  });
});
