import { Module } from "@nestjs/common";
import { ReceiveWeatherLogUseCase } from "src/domain/weatherLog/application/use-cases/receive-weather-log.usecase";
import { DatabaseModule } from "src/infra/database/database.module";
import { ReceiveWeatherLogController } from "./models/controllers/receive-weather-log.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [ReceiveWeatherLogController],
  providers: [ReceiveWeatherLogUseCase],
})
export class WeatherLogModule {}
