import { INestApplication } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Model } from "mongoose";
import { WeatherLog } from "src/domain/weatherLog/enterprise/entities/weather-log.entity";
import { AppModule } from "src/infra/app.module";
import { WeatherLogDocument } from "src/infra/database/mongoose/schemas/weather-log.schema";
import request from "supertest";
import { weatherLogStub } from "test/stubs/weather-log.stub";
import { TWeatherLogControllerRequest } from "../schemas/weather-log-controller-request.schema";

const WEATHER_MODEL_TOKEN = getModelToken(WeatherLog.name);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForInsight(
  model: Model<WeatherLogDocument>,
  latitude: number,
  timeoutMs: number = 5000,
  intervalMs: number = 200
): Promise<TWeatherLogControllerRequest | null> {
  const startTime = Date.now();

  while (Date.now() - startTime < timeoutMs) {
    const weatherLog = await model.findOne({
      "location.latitude": latitude,
    });

    if (weatherLog?.insight) {
      return weatherLog;
    }
    await delay(intervalMs);
  }

  return await model.findOne({ "location.latitude": latitude });
}

describe("Receive Weather log (E2E)", () => {
  let app: INestApplication;
  let weatherModel: Model<WeatherLogDocument>;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    weatherModel =
      moduleRef.get<Model<WeatherLogDocument>>(WEATHER_MODEL_TOKEN);
    await weatherModel.deleteMany({});
  });

  afterAll(async () => {
    await weatherModel.deleteMany({});
    await app.close();
  });

  describe("[POST]/weather-log", () => {
    beforeEach(async () => {
      await weatherModel.deleteMany({});
    });

    // keep this test skipped unless you want to verify the AI insight generation
    // this process cost tokens upon your api key
    it.skip("The AI should return a insight upon weather creation", async () => {
      const weatherLog = weatherLogStub();

      const response = await request(app.getHttpServer())
        .post("/weather-log")
        .send(weatherLog);

      expect(response.statusCode).toBe(201);

      const weatherOnDatabase = await waitForInsight(
        weatherModel,
        weatherLog.location.latitude
      );

      expect(weatherOnDatabase).toBeTruthy();
      expect(weatherOnDatabase?.insight).toEqual(expect.any(String));
    });
  });
});
