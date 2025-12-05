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
import { weatherLogStub } from "test/stubs/weather-log.stub";
import { TWeatherLogControllerRequest } from "../schemas/weather-log-controller-request.schema";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";

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

  beforeEach(async () => {
    await weatherModel.deleteMany({});
  });

  describe("[POST]/weather-log", () => {
    it("should be able to receive/create a weather log", async () => {
      const weatherLog = weatherLogStub();

      const response = await request(app.getHttpServer())
        .post("/weather-log")
        .send(weatherLog);

      expect(response.statusCode).toBe(201);

      const weatherOnDatabase: TWeatherLogControllerRequest | null =
        await weatherModel.findOne({
          "location.latitude": weatherLog.location.latitude,
        });

      expect(weatherOnDatabase).toBeTruthy();
      expect(weatherOnDatabase?.location.latitude).toEqual(
        weatherLog.location.latitude
      );
    });

    test("When a second weather log be created, the first one must have its current forecast emptied", async () => {
      const oldWeatherLog = weatherLogStub({
        createdAt: new Date(2025, 11, 10),
      });

      const oldWeatherLogDocument = await weatherModel.create({
        ...oldWeatherLog,
        currentForecastStats: oldWeatherLog.currentForecastStats,
        _id: new UniqueEntityId().toString(),
      });

      const logOnDatabase = await weatherModel.findById(
        oldWeatherLogDocument._id
      );
      expect(logOnDatabase?.currentForecastStats).toHaveLength(1);

      const recentWeatherLog = weatherLogStub({
        createdAt: new Date(2025, 11, 20),
      });

      await request(app.getHttpServer())
        .post("/weather-log")
        .send(recentWeatherLog);

      const updatedOldLog = await weatherModel.findById(
        oldWeatherLogDocument._id
      );

      expect(updatedOldLog).toBeTruthy();
      expect(updatedOldLog?.currentForecastStats).toEqual([]);

      const newLogCount = await weatherModel.countDocuments();
      expect(newLogCount).toBe(2);
    });
  });
});
