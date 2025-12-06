import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { WeatherLogPresenter } from "src/infra/http/presenters/weather-log.presenter";
import {
  WeatherLogPropsSwaggerDTO,
  WeatherLogResponseSwaggerDTO,
} from "../dto/weather-log-props-swagger.dto";
import { FindMostRecentWeatherLogUseCase } from "src/domain/weatherLog/application/use-cases/find-most-recent-weather-log.usecase";

@ApiTags("Weather")
@Controller("/weather-log/recent")
export class FindRecentLogController {
  constructor(
    private findMostRecentWeatherLogUseCase: FindMostRecentWeatherLogUseCase
  ) {}

  @Get()
  @ApiOkResponse({
    description: "OK - Weather received",
    type: WeatherLogPropsSwaggerDTO,
  })
  @ApiResponse({ status: 400, description: "Bad request - Zod error" })
  @ApiResponse({
    status: 404,
    description: "Not found - No registered weather logs",
  })
  async handle(): Promise<WeatherLogResponseSwaggerDTO> {
    Logger.log("Start finding recent weather log", "FindRecentLogController");

    const result = await this.findMostRecentWeatherLogUseCase.execute();

    if (result.isFailure()) {
      const error = result.value;

      Logger.error(error.message, "FindRecentLogController");
      switch (error.constructor) {
        case DataNotFoundError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException();
      }
    }

    Logger.log("Recent weather log found", "ReceiveWeatherLogController");
    const { weatherLog } = result.value;
    const response = WeatherLogPresenter.toHTTP(weatherLog);

    return {
      createdAt: response.createdAt,
      currentForecastStats: response.currentForecastStats,
      hourlyObservationStats: response.hourlyObservationStats,
      location: response.location,
      insight: response.insight,
      updatedAt: response.updatedAt,
      id: response.id.toString(),
    };
  }
}
