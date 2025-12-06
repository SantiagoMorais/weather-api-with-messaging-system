import { ApiProperty } from "@nestjs/swagger";
import {
  TWeatherLogControllerRequest,
  TWeatherLogControllerResponse,
} from "../schemas/weather-log-controller-request.schema";
import { LocationDTO } from "./location.dto";
import { ObservationStatsDTO } from "./observation-stats.dto";

export class WeatherLogPropsSwaggerDTO implements TWeatherLogControllerRequest {
  @ApiProperty({
    description: "Date when the log was created (System timestamp)",
    example: "2025-12-04T17:00:00.000Z",
    type: "string",
    format: "date-time",
    required: true,
  })
  createdAt: Date;

  @ApiProperty({
    description: "Date when the log was last updated (System timestamp)",
    example: "2025-12-04T17:00:00.000Z",
    type: "string",
    format: "date-time",
    required: true,
    nullable: true,
  })
  updatedAt?: Date | null;

  @ApiProperty({
    description: "Geographic location data",
    type: LocationDTO,
    required: true,
  })
  location: LocationDTO;

  @ApiProperty({
    description: "Current hourly observation statistics",
    type: ObservationStatsDTO,
    required: true,
  })
  hourlyObservationStats: ObservationStatsDTO;

  @ApiProperty({
    description:
      "List of forecasted observation statistics (e.g., next 24 hours)",
    type: [ObservationStatsDTO],
    required: true,
    isArray: true,
  })
  currentForecastStats: ObservationStatsDTO[];

  @ApiProperty({
    description:
      "AI-generated insight/analysis on the current weather conditions, focusing on daily life and safety.",
    example:
      "O clima está quente e seco, ideal para atividades externas, mas mantenha-se hidratado. Não há riscos iminentes.",
    type: "string",
    nullable: true,
    required: false,
  })
  insight?: string | null;
}

export class WeatherLogResponseSwaggerDTO
  extends WeatherLogPropsSwaggerDTO
  implements TWeatherLogControllerResponse
{
  @ApiProperty({
    description: "The database id of the weather log",
  })
  id: string;
}
