import { ApiProperty } from "@nestjs/swagger";
import { TLocation } from "src/infra/http/modules/weather-log/models/schemas/location.schema";

export class LocationDTO implements TLocation {
  @ApiProperty({
    description: "Longitude of the location (between -180 and 180)",
    example: -43.9333,
    type: "number",
    required: true,
  })
  longitude: number;

  @ApiProperty({
    description: "Latitude of the location (between -90 and 90)",
    example: -19.9167,
    type: "number",
    required: true,
  })
  latitude: number;

  @ApiProperty({
    description: "Timezone identifier (e.g., 'America/Sao_Paulo')",
    example: "America/Sao_Paulo",
    required: true,
  })
  timezone: string;
}
