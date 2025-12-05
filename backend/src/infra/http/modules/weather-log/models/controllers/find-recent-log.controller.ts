import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { FindWeatherLogByDateUseCase } from "src/domain/weatherLog/application/use-cases/find-weather-log-by-date.usecase";
import { MongooseWeatherLogMapper } from "src/infra/database/mongoose/mappers/mongoose-weather-log.mapper";
import { WeatherLogPropsSwaggerDTO } from "../dto/weather-log-props-swagger.dto";

@ApiTags("Weather")
@Controller("/weather-log/recent")
export class FindRecentLogController {
  constructor(
    private findWeatherLogByDateUseCase: FindWeatherLogByDateUseCase
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
  async handle(): Promise<WeatherLogPropsSwaggerDTO> {
    Logger.log("Start finding recent weather log", "FindRecentLogController");

    const now = new Date();
    const result = await this.findWeatherLogByDateUseCase.execute({
      date: now,
    });

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
    const response = MongooseWeatherLogMapper.toMongoose(weatherLog);

    return { ...response };
  }
}
