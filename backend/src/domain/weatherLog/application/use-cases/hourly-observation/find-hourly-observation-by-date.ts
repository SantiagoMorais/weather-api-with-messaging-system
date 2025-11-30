import {
  IFindHourlyObservationByDateRequest,
  TFindHourlyObservationByDateUseCase,
} from "src/core/interfaces/use-cases/weather-log/find-hourly-observation-by-date-use-case";
import { HourlyObservationRepository } from "../../repositories/hourly-observation-repository";
import { failure, success } from "src/core/result";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";

export class FindHourlyObservationByDateUseCase {
  constructor(
    private hourlyObservationRepository: HourlyObservationRepository
  ) {}

  async execute({
    timeStamp,
  }: IFindHourlyObservationByDateRequest): Promise<TFindHourlyObservationByDateUseCase> {
    const hourlyObservation =
      await this.hourlyObservationRepository.findByDate(timeStamp);

    if (!hourlyObservation)
      return failure(
        new DataNotFoundError(
          "There is not a hourly observation with this timestamp."
        )
      );

    return success({ hourlyObservation });
  }
}
