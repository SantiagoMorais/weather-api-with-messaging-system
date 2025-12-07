import { ApiProperty } from "@nestjs/swagger";
import { CustomWeatherInsightDTO } from "./custom-weather-insight-dto";

export class GenerateCustomWeatherInsightResponseDTO {
  @ApiProperty({
    description: "O objeto de insights climáticos personalizados gerados.",
    type: CustomWeatherInsightDTO,
    required: true,
  })
  insights: CustomWeatherInsightDTO;
}
