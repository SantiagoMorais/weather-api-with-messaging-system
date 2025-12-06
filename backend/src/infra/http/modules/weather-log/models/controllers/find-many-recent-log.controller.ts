import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Param,
} from "@nestjs/common";
import { ApiOkResponse, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FindManyWeatherLogRecentUseCase } from "src/domain/weatherLog/application/use-cases/find-many-weather-log-recent.usecase";
import { WeatherLogPresenter } from "src/infra/http/presenters/weather-log.presenter";
import { WeatherLogSummarizedSwaggerDTO } from "../dto/weather-log-summarized-swagger.dto";
import { IFindManyWeatherLogsResponse } from "../interfaces/find-many-weather-logs-response";

@ApiTags("Weather")
@Controller("/weather-logs/:count")
export class FindManyRecentLogController {
  constructor(
    private findManyRecentLogUseCase: FindManyWeatherLogRecentUseCase
  ) {}

  @Get()
  @ApiOkResponse({
    description: "OK - Data received",
    type: WeatherLogSummarizedSwaggerDTO,
  })
  @ApiResponse({ status: 400, description: "Bad request - Zod error" })
  @ApiParam({
    name: "count",
    description:
      "The number of weather logs to receive. If omitted, the last 12 will be returned",
    required: false,
  })
  async handle(
    @Param("count") count?: number
  ): Promise<IFindManyWeatherLogsResponse> {
    Logger.log(
      "Start searching for recent weather logs list",
      "FindManyRecentLogController"
    );

    const result = await this.findManyRecentLogUseCase.execute({
      count,
    });

    if (result.isFailure()) {
      Logger.error(
        "Zod validation or unexpected error occur.",
        "FindManyRecentLogController"
      );

      throw new BadRequestException(
        "Zod validation or unexpected error occur."
      );
    }

    Logger.log("Weather logs list found", "FindManyRecentLogController");

    const { weatherLogs } = result.value;

    const emptyList = Boolean(!weatherLogs.length);

    const weatherLogsFormatted = weatherLogs.map((log) =>
      WeatherLogPresenter.toHTTP(log)
    );

    return {
      location: emptyList ? undefined : weatherLogs[0].location,
      weatherLogs: weatherLogsFormatted,
    };
  }
}
