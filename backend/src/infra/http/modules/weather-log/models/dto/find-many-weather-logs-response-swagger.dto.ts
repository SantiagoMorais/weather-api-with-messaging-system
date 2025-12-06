import { ApiProperty } from "@nestjs/swagger";
import { IFindManyWeatherLogsResponse } from "../interfaces/find-many-weather-logs-response";
import { LocationDTO } from "./location.dto";
import { WeatherLogSummarizedSwaggerDTO } from "./weather-log-summarized-swagger.dto";

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
