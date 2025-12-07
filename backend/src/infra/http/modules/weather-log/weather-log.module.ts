import { Module } from "@nestjs/common";
import { OnWeatherLogCreated } from "src/domain/weatherLog/application/handlers/on-weather-log-created.handler";
import { AIInsightGenerator } from "src/domain/weatherLog/application/services/ai-insight-generator.service";
import { FindCurrentForecastUseCase } from "src/domain/weatherLog/application/use-cases/find-current-forecast.usecase";
import { FindCurrentHourlyObservationUseCase } from "src/domain/weatherLog/application/use-cases/find-current-hourly-observation.usecase";
import { FindInsightUseCase } from "src/domain/weatherLog/application/use-cases/find-current-insight.usecase";
import { FindManyWeatherLogRecentUseCase } from "src/domain/weatherLog/application/use-cases/find-many-weather-log-recent.usecase";
import { FindMostRecentWeatherLogUseCase } from "src/domain/weatherLog/application/use-cases/find-most-recent-weather-log.usecase";
import { ReceiveWeatherLogUseCase } from "src/domain/weatherLog/application/use-cases/receive-weather-log.usecase";
import { DatabaseModule } from "src/infra/database/database.module";
import { EnvModule } from "src/infra/env/env.module";
import { GeminiInsightGateway } from "src/infra/gateways/gemini-insight-gateway.service";
import { FindCurrentForecastController } from "./models/controllers/find-current-forecast.controller";
import { FindCurrentHourlyObservationController } from "./models/controllers/find-current-hourly-observation.controller";
import { FindCurrentInsightController } from "./models/controllers/find-current-insight.controller";
import { FindManyRecentLogController } from "./models/controllers/find-many-recent-log.controller";
import { FindRecentLogController } from "./models/controllers/find-recent-log.controller";
import { ReceiveWeatherLogController } from "./models/controllers/receive-weather-log.controller";
import { GenerateCustomWeatherInsight } from "src/domain/weatherLog/application/use-cases/generate-custom-weather-insight";
import { GenerateCustomWeatherInsightsController } from "./models/controllers/generate-custom-insights.controller";

@Module({
  imports: [DatabaseModule, EnvModule],
  controllers: [
    ReceiveWeatherLogController,
    FindRecentLogController,

    FindCurrentHourlyObservationController,
    FindCurrentForecastController,
    FindCurrentInsightController,
    GenerateCustomWeatherInsightsController,

    FindManyRecentLogController,
  ],
  providers: [
    ReceiveWeatherLogUseCase,
    FindMostRecentWeatherLogUseCase,
    FindManyWeatherLogRecentUseCase,
    FindCurrentHourlyObservationUseCase,
    FindCurrentForecastUseCase,
    FindInsightUseCase,
    GenerateCustomWeatherInsight,
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
