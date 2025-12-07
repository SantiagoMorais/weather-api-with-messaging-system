import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { ApiOkResponse, ApiResponse } from "@nestjs/swagger";
import { GenerateCustomWeatherInsight } from "src/domain/weatherLog/application/use-cases/generate-custom-weather-insight";
import { GenerateCustomWeatherInsightResponseDTO } from "../dto/generate-custom-weather-insight-response.dto";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";

@Controller("/weather-logs/custom-insights")
export class GenerateCustomWeatherInsightsController {
  constructor(
    private generateCustomWeatherInsight: GenerateCustomWeatherInsight
  ) {}

  @Get()
  @ApiOkResponse({
    description: "OK - Insight Generated",
    type: GenerateCustomWeatherInsightResponseDTO,
  })
  @ApiResponse({
    description: "Bad Request",
    status: 400,
  })
  @ApiResponse({
    description: "Not Found - There are not any weather log registered yet",
    status: 404,
  })
  async handle(): Promise<GenerateCustomWeatherInsightResponseDTO> {
    const result = await this.generateCustomWeatherInsight.execute();
    Logger.log(
      "Generating insights for hourly observation",
      "GenerateCustomWeatherInsightsController"
    );

    if (result.isFailure()) {
      const error = result.value;

      Logger.error(error.message, "GenerateCustomWeatherInsightResponseDTO");

      switch (error.constructor) {
        case DataNotFoundError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException();
      }
    }

    const insights = result.value;
    return insights;
  }
}
