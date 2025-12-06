import { ApiProperty } from "@nestjs/swagger";
import { TObservationStats } from "src/core/types/weather-log/observation-stats.schema";

export class ObservationStatsDTO implements TObservationStats {
  @ApiProperty({
    description: "Timestamp of the observation",
    example: "2025-12-04T18:00:00.000Z",
    type: "string",
    format: "date-time",
    required: true,
  })
  timestamp: Date;

  @ApiProperty({ description: "Current air temperature (°C)", example: 25.5 })
  temperature: number;

  @ApiProperty({
    description: "Indicates if it is currently day (true) or night (false)",
    example: true,
  })
  isDay: boolean;

  @ApiProperty({ description: "UV Index", example: 7 })
  uvIndex: number;

  @ApiProperty({
    description: "Relative humidity percentage (0-100)",
    example: 65,
  })
  relativeHumidity: number;

  @ApiProperty({
    description: "Apparent (feels like) temperature (°C)",
    example: 27.8,
  })
  apparentTemperature: number;

  @ApiProperty({
    description: "Probability of precipitation percentage (0-100)",
    example: 10,
  })
  precipitationProbability: number;

  @ApiProperty({ description: "Total precipitation (mm)", example: 0.5 })
  precipitation: number;

  @ApiProperty({ description: "Rainfall (mm)", example: 0.1 })
  rain: number;

  @ApiProperty({
    description: "Cloud cover percentage (0-100)",
    example: 30,
  })
  cloudCover: number;

  @ApiProperty({ description: "Visibility (meters)", example: 10000 })
  visibility: number;

  @ApiProperty({ description: "Wind speed (km/h)", example: 15.2 })
  windSpeed: number;

  @ApiProperty({ description: "Soil temperature (°C)", example: 22.0 })
  soilTemperature: number;

  @ApiProperty({
    description: "Soil moisture percentage (0-100)",
    example: 45,
  })
  soilMoisture: number;
}

export class ObservationStatsWithIdDTO extends ObservationStatsDTO {
  @ApiProperty({
    description: "The database id of weather log",
  })
  _id: string;

  @ApiProperty({
    description: "Current hourly observation statistics",
    type: ObservationStatsDTO,
    required: true,
  })
  observationStats: ObservationStatsDTO;
}
