import { Module } from "@nestjs/common";
import { ReceiveWeatherLogUseCase } from "src/domain/weatherLog/application/use-cases/receive-weather-log.usecase";
import { DatabaseModule } from "src/infra/database/database.module";
import { ReceiveWeatherLogController } from "./models/controllers/receive-weather-log.controller";
import { AIInsightGenerator } from "src/domain/weatherLog/application/services/ai-insight-generator.service";
import { GeminiInsightGateway } from "src/infra/gateways/gemini-insight-gateway.service";
import { OnWeatherLogCreated } from "src/domain/weatherLog/application/handlers/on-weather-log-created.handler";
import { EnvModule } from "src/infra/env/env.module";
import { FindRecentLogController } from "./models/controllers/find-recent-log.controller";
import { FindWeatherLogByDateUseCase } from "src/domain/weatherLog/application/use-cases/find-weather-log-by-date.usecase";
import { FindManyRecentLogController } from "./models/controllers/find-many-recent-log.controller";
import { FindManyWeatherLogRecentUseCase } from "src/domain/weatherLog/application/use-cases/find-many-weather-log-recent.usecase";

@Module({
  imports: [DatabaseModule, EnvModule],
  controllers: [
    ReceiveWeatherLogController,
    FindRecentLogController,
    FindManyRecentLogController,
  ],
  providers: [
    ReceiveWeatherLogUseCase,
    FindWeatherLogByDateUseCase,
    FindManyWeatherLogRecentUseCase,
    // The GEMINI interface and implementation to insight generation
    {
      provide: AIInsightGenerator,
      useClass: GeminiInsightGateway,
    },
    // The WeatherLogCreatedEvent Handler. When Nest initialize it, will call this.setupSubscriptions() on the constructor and register the handler.
    OnWeatherLogCreated,
  ],
})
export class WeatherLogModule {}
