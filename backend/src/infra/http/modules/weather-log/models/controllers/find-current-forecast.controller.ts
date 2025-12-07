import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { FindCurrentForecastUseCase } from "src/domain/weatherLog/application/use-cases/find-current-forecast.usecase";
import { CurrentForecastSwaggerDTO } from "../dto/current-forecast-swagger.dto";

@ApiTags("Weather")
@Controller("/weather-logs/current-forecast")
export class FindCurrentForecastController {
  constructor(private findCurrentForecastUseCase: FindCurrentForecastUseCase) {}

  @Get()
  @ApiOkResponse({
    description: "OK - Data received",
    type: CurrentForecastSwaggerDTO,
  })
  @ApiResponse({ status: 400, description: "Bad request - Zod error" })
  @ApiResponse({ status: 404, description: "Not found - Data not created yet" })
  async handle(): Promise<CurrentForecastSwaggerDTO> {
    const result = await this.findCurrentForecastUseCase.execute();
    Logger.log(
      "Starting searching for current forecast",
      "FindCurrentForecastController"
    );

    if (result.isFailure()) {
      const error = result.value;

      Logger.error(error.message, "FindCurrentForecastController");

      switch (error.constructor) {
        case DataNotFoundError:
          throw new NotFoundException();
        default:
          throw new BadRequestException();
      }
    }

    const { currentForecast, id } = result.value;
    return { currentForecast, id };
  }
}
