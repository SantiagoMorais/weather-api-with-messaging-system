import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { FindInsightUseCase } from "src/domain/weatherLog/application/use-cases/find-current-insight.usecase";
import { FindCurrentInsightSwaggerDTO } from "../dto/find-current-insight-swagger.dto";

@ApiTags("Weather")
@Controller("/weather-log/insight")
export class FindCurrentInsightController {
  constructor(private findInsightUseCase: FindInsightUseCase) {}

  @Get()
  @ApiOkResponse({
    description: "OK - Data received",
    type: FindCurrentInsightSwaggerDTO,
  })
  @ApiResponse({ status: 400, description: "Bad request - Zod error" })
  @ApiResponse({ status: 404, description: "Not found - Data not created yet" })
  async handle(): Promise<FindCurrentInsightSwaggerDTO> {
    const result = await this.findInsightUseCase.execute();
    Logger.log(
      "Starting searching for recent hourly observation",
      "FindCurrentInsightController"
    );

    if (result.isFailure()) {
      const error = result.value;

      Logger.error(error.message, "FindCurrentInsightController");

      switch (error.constructor) {
        case DataNotFoundError:
          throw new NotFoundException();
        default:
          throw new BadRequestException();
      }
    }

    const { insight, id } = result.value;
    return { currentInsight: insight, id };
  }
}
