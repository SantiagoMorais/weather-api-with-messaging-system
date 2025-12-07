import { INestApplication } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Model } from "mongoose";
import { AIInsightGenerator } from "src/domain/weatherLog/application/services/ai-insight-generator.service";
import { WeatherLog } from "src/domain/weatherLog/enterprise/entities/weather-log.entity";
import { AppModule } from "src/infra/app.module";
import { WeatherLogDocument } from "src/infra/database/mongoose/schemas/weather-log.schema";
import { EnvService } from "src/infra/env/env.service";
import request from "supertest";
import { MockAIInsightGenerator } from "test/mocks/mock-ai-insight-generator";
import { weatherLogStub } from "test/stubs/weather-log.stub";
import { TWeatherLogControllerResponse } from "../schemas/weather-log-controller-request.schema";

const WEATHER_MODEL_TOKEN = getModelToken(WeatherLog.name);

describe("Receive Weather log (E2E)", () => {
  let app: INestApplication;
  let weatherModel: Model<WeatherLogDocument>;
  let env: EnvService;

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
    env = app.get(EnvService);
  });

  afterAll(async () => {
    await weatherModel.deleteMany({});
    await app.close();
  });

  beforeEach(async () => {
    await weatherModel.deleteMany({});
  });

  describe("[POST]/weather-log", () => {
    it("should be able to receive/create a weather log", async () => {
      const { request: weatherLog } = weatherLogStub({
        createdAt: new Date(2020, 10, 23),
      });

      const response = await request(app.getHttpServer())
        .post("/weather-logs")
        .set("x-worker-key", env.get("WORKER_API_KEY"))
        .send(weatherLog);

      expect(response.statusCode).toBe(201);

      const weatherOnDatabase: TWeatherLogControllerResponse | null =
        await weatherModel.findOne({
          "location.latitude": weatherLog.location.latitude,
        });

      expect(weatherOnDatabase).toBeTruthy();
      expect(weatherOnDatabase?.location.latitude).toEqual(
        weatherLog.location.latitude
      );
    });

    test("When a second weather log be created, the first one must have its current forecast emptied", async () => {
      const { request: firstLog } = weatherLogStub({
        createdAt: new Date(2025, 11, 10),
      });

      await request(app.getHttpServer())
        .post("/weather-logs")
        .set("x-worker-key", env.get("WORKER_API_KEY"))
        .send(firstLog); // first creation

      const mostRecentLog = weatherLogStub({
        createdAt: new Date(2025, 11, 20),
      });

      await request(app.getHttpServer())
        .post("/weather-logs")
        .set("x-worker-key", env.get("WORKER_API_KEY"))
        .send(mostRecentLog); // second creation

      const [firstLogOnDatabase] = await weatherModel
        .find()
        .sort({ createdAt: 1 })
        .limit(1)
        .lean();

      expect(firstLogOnDatabase).toBeTruthy();
      expect(firstLogOnDatabase?.currentForecastStats).toEqual([]);
    });
  });
});
