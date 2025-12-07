import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Res,
} from "@nestjs/common";
import { ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { type Response } from "express";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { FindMostRecentWeatherLogUseCase } from "src/domain/weatherLog/application/use-cases/find-most-recent-weather-log.usecase";
import { WeatherLogPresenter } from "src/infra/http/presenters/weather-log.presenter";
import { WeatherExportService } from "src/infra/http/services/weather-export-service";

@ApiTags("Weather")
@Controller("weather-logs")
export class DownloadWeatherDataController {
  constructor(
    private readonly exportService: WeatherExportService,
    private readonly findMostRecentWeatherLogUseCase: FindMostRecentWeatherLogUseCase
  ) {}

  @Get("export/csv")
  @ApiOkResponse({
    description: "OK - Weather data created",
  })
  @ApiResponse({ status: 400, description: "Bad request - Zod error" })
  @ApiResponse({
    status: 404,
    description: "Not found - No registered weather logs",
  })
  async exportCSV(@Param("id") @Res() res: Response) {
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

    const csv = this.exportService.generateCSV(response);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=weather-${response.id}.csv`
    );
    res.send(csv);
  }

  @Get("export/xlsx")
  @ApiOkResponse({
    description: "OK - Weather data created",
  })
  @ApiResponse({ status: 400, description: "Bad request - Zod error" })
  @ApiResponse({
    status: 404,
    description: "Not found - No registered weather logs",
  })
  async exportXLSX(@Res() res: Response) {
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

    const buffer = await this.exportService.generateXLSX(response);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=weather-${response.id}.xlsx`
    );
    res.send(buffer);
  }
}
