import {
  IFindManyHourlyObservationRecentRequest,
  TFindManyHourlyObservationRecentUseCase,
} from "src/core/interfaces/use-cases/weather-log/find-many-hourly-observation-recent-use-case";
import { success } from "src/core/result";
import { HourlyObservationRepository } from "../../repositories/hourly-observation-repository";

export class FindManyHourlyObservationRecentUseCase {
  constructor(
    private hourlyObservationRepository: HourlyObservationRepository
  ) {}

  async execute({
    count,
  }: IFindManyHourlyObservationRecentRequest): Promise<TFindManyHourlyObservationRecentUseCase> {
    const recentHourlyObservation =
      await this.hourlyObservationRepository.findManyRecent(count);

    return success({ recentHourlyObservation });
  }
}
