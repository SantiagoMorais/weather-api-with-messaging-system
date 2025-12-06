import { ApiProperty } from "@nestjs/swagger";
import { ICurrentForecastWithId } from "../interfaces/current-forecast-with-id";
import { ObservationStatsDTO } from "./observation-stats.dto";

export class CurrentForecastSwaggerDTO implements ICurrentForecastWithId {
  @ApiProperty({
    description: "The database id of the weather log",
  })
  id: string;

  @ApiProperty({
    description: "Current hourly observation statistics",
    type: [ObservationStatsDTO],
    required: true,
  })
  currentForecast: ObservationStatsDTO[];
}
