import { Injectable } from "@nestjs/common";
import { DataAlreadyExistsError } from "src/core/errors/data-already-exists-error";
import {
  ICreateHourlyObservationUseCaseRequest,
  ICreateHourlyObservationUseCaseResponse,
} from "src/core/interfaces/use-cases/weather-log/create-hourly-observation-use-case";
import { failure, success } from "src/core/result";
import { HourlyObservation } from "src/domain/weatherLog/enterprise/entities/hourly-observation";
import { formatDateToString } from "src/utils/formatDateToString";
import { HourlyObservationRepository } from "../../repositories/hourly-observation-repository";

@Injectable()
export class CreateHourlyObservation {
  constructor(
    private hourlyObservationRepository: HourlyObservationRepository
  ) {}

  async execute(
    observation: ICreateHourlyObservationUseCaseRequest
  ): Promise<ICreateHourlyObservationUseCaseResponse> {
    const timestamp = observation.stats.timestamp;
    const observationAlreadyExists =
      await this.hourlyObservationRepository.findByDate(timestamp);

    if (observationAlreadyExists)
      return failure(
        new DataAlreadyExistsError(
          `Hourly Observation with timestamp ${formatDateToString(timestamp)} already registered.`
        )
      );

    const hourlyObservation = HourlyObservation.create(observation);

    await this.hourlyObservationRepository.create(hourlyObservation);
    return success({ hourlyObservation });
  }
}
