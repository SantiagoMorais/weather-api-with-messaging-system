import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { FindCurrentHourlyObservationUseCase } from "src/domain/weatherLog/application/use-cases/find-current-hourly-observation.usecase";
import { ObservationStatsWithIdDTO } from "../dto/observation-stats.dto";

@ApiTags("Weather")
@Controller("weather-logs")
export class FindCurrentHourlyObservationController {
  constructor(
    private findCurrentHourlyObservationUseCase: FindCurrentHourlyObservationUseCase
  ) {}

  @Get("hourly-observation")
  @ApiOkResponse({
    description: "OK - Data received",
    type: ObservationStatsWithIdDTO,
  })
  @ApiResponse({ status: 400, description: "Bad request - Zod error" })
  @ApiResponse({ status: 404, description: "Not found - Data not created yet" })
  async handle(): Promise<ObservationStatsWithIdDTO> {
    const result = await this.findCurrentHourlyObservationUseCase.execute();
    Logger.log(
      "Starting searching for recent hourly observation",
      "FindCurrentHourlyObservationController"
    );

    if (result.isFailure()) {
      const error = result.value;

      Logger.error(error.message, "FindCurrentHourlyObservationController");

      switch (error.constructor) {
        case DataNotFoundError:
          throw new NotFoundException();
        default:
          throw new BadRequestException();
      }
    }

    const { hourlyObservation, id } = result.value;
    return { hourlyObservation, id };
  }
}
