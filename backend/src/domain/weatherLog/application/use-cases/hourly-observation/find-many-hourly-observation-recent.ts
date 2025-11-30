import {
  IFindManyRecentHourlyObservationRequest,
  TFindManyRecentHourlyObservationUseCase,
} from "src/core/interfaces/use-cases/weather-log/find-many-recent-hourly-observation-use-case";
import { success } from "src/core/result";
import { HourlyObservationRepository } from "../../repositories/hourly-observation-repository";

export class FindManyRecentHourlyObservationUseCase {
  constructor(
    private hourlyObservationRepository: HourlyObservationRepository
  ) {}

  async execute({
    count,
  }: IFindManyRecentHourlyObservationRequest): Promise<TFindManyRecentHourlyObservationUseCase> {
    const recentHourlyObservation =
      await this.hourlyObservationRepository.findManyRecent(count);

    return success({ recentHourlyObservation });
  }
}
