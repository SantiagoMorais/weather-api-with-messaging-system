import { INestApplication } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Model } from "mongoose";
import { AIInsightGenerator } from "src/domain/weatherLog/application/services/ai-insight-generator.service";
import { WeatherLog } from "src/domain/weatherLog/enterprise/entities/weather-log.entity";
import { AppModule } from "src/infra/app.module";
import { WeatherLogDocument } from "src/infra/database/mongoose/schemas/weather-log.schema";
import request from "supertest";
import { MockAIInsightGenerator } from "test/mocks/mock-ai-insight-generator";
import { TWeatherLogControllerRequest } from "../schemas/weather-log-controller-request.schema";
import { weatherLogStub } from "test/stubs/weather-log.stub";

const WEATHER_MODEL_TOKEN = getModelToken(WeatherLog.name);

describe("Receive Weather log (E2E)", () => {
  let app: INestApplication;
  let weatherModel: Model<WeatherLogDocument>;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AIInsightGenerator)
      .useClass(MockAIInsightGenerator)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    weatherModel =
      moduleRef.get<Model<WeatherLogDocument>>(WEATHER_MODEL_TOKEN);
  });

  afterAll(async () => {
    await weatherModel.deleteMany({});
    await app.close();
  });

  test("[POST]/weather-log", async () => {
    const weatherLog = weatherLogStub();

    const response = await request(app.getHttpServer())
      .post("/weather-log")
      .send(weatherLog);

    expect(response.statusCode).toBe(201);

    const weatherOnDatabase: TWeatherLogControllerRequest | null =
      await weatherModel.findOne({
        "location.latitude": weatherLog.location.latitude,
      });

    console.log(weatherOnDatabase);

    expect(weatherOnDatabase).toBeTruthy();
    expect(weatherOnDatabase?.location.latitude).toEqual(
      weatherLog.location.latitude
    );
  });
});
