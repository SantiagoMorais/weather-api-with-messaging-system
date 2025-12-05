import { ApiProperty } from "@nestjs/swagger";
import {
  IFindManyWeatherLogsResponse,
  IWeatherLogSummarized,
} from "../interfaces/find-many-weather-logs-response";
import { LocationDTO } from "./location.dto";
import { ObservationStatsDTO } from "./observation-stats.dto";

export class WeatherLogSummarizedSwaggerDTO implements IWeatherLogSummarized {
  @ApiProperty({
    description: "Date when the log was created (System timestamp)",
    example: "2025-12-04T17:00:00.000Z",
    type: "string",
    format: "date-time",
  })
  createdAt: Date;

  @ApiProperty({
    description: "Date when the log was last updated (System timestamp)",
    example: "2025-12-04T17:00:00.000Z",
    type: "string",
    format: "date-time",
    nullable: true,
  })
  updatedAt?: Date | null;

  @ApiProperty({
    description:
      "AI-generated insight/analysis on the current weather conditions, focusing on daily life and safety.",
    example:
      "O clima está quente e seco, ideal para atividades externas, mas mantenha-se hidratado. Não há riscos iminentes.",
    type: "string",
    nullable: true,
  })
  insight?: string | null;

  @ApiProperty({
    description: "Current hourly observation statistics",
    type: ObservationStatsDTO,
  })
  hourlyObservationStats: ObservationStatsDTO;
}

export class FindManyWeatherLogsResponseSwaggerDTO implements IFindManyWeatherLogsResponse {
  @ApiProperty({
    description: "Geographic location data",
    type: LocationDTO,
  })
  location?: LocationDTO;

  @ApiProperty({
    description:
      "The array of logs that contain the location, hourly observation stats, timestamp data and the AI insight.",
    type: WeatherLogSummarizedSwaggerDTO,
  })
  weatherLogs: WeatherLogSummarizedSwaggerDTO[];
}
