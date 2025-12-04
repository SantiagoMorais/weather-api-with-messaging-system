import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Logger,
  Post,
} from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ReceiveWeatherLogUseCase } from "src/domain/weatherLog/application/use-cases/receive-weather-log.usecase";
import { Public } from "src/infra/auth/public";
import {
  type TWeatherLogControllerRequest,
  weatherLogPropsSchema,
} from "../schemas/weather-log-controller-request.schema";
import { ZodValidationPipe } from "src/infra/http/pipes/zod-validation.pipe";
import { WeatherLogPropsSwaggerDTO } from "../dto/weather-log-props-swagger.dto";
import { DataAlreadyExistsError } from "src/core/errors/data-already-exists-error";

const bodyValidationPipe = new ZodValidationPipe(weatherLogPropsSchema);

@ApiTags("Weather")
@Controller("/weather-log")
@Public()
export class ReceiveWeatherLogController {
  constructor(private receiveWeatherLogUseCase: ReceiveWeatherLogUseCase) {}

  @Post()
  @ApiBody({ type: WeatherLogPropsSwaggerDTO })
  @ApiResponse({ status: 201, description: "Created - Weather log received" })
  @ApiResponse({ status: 400, description: "Bad request - Data not match" })
  @ApiResponse({
    status: 409,
    description: `Conflict - Weather log with hour ${new Date().getHours()}h already exists for today`,
  })
  async handle(@Body(bodyValidationPipe) body: TWeatherLogControllerRequest) {
    const data = body;

    Logger.log("Start creating weather log", "ReceiveWeatherLogController");

    const result = await this.receiveWeatherLogUseCase.execute(data);

    if (result.isFailure()) {
      const error = result.value;

      Logger.error(error.message, "ReceiveWeatherLogController");
      switch (error.constructor) {
        case DataAlreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException();
      }
    }

    Logger.log("Weather received successfully", "ReceiveWeatherLogController");
  }
}
