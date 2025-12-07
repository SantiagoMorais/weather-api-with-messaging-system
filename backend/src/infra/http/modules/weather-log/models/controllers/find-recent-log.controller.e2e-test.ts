import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { Model } from "mongoose";
import { WeatherLogDocument } from "src/infra/database/mongoose/schemas/weather-log.schema";
import { AppModule } from "src/infra/app.module";
import { AIInsightGenerator } from "src/domain/weatherLog/application/services/ai-insight-generator.service";
import { MockAIInsightGenerator } from "test/mocks/mock-ai-insight-generator";
import { getModelToken } from "@nestjs/mongoose";
import { WeatherLog } from "src/domain/weatherLog/enterprise/entities/weather-log.entity";
import { JwtService } from "@nestjs/jwt";
import { authenticateAndGetToken } from "test/helpers/authenticate-and-get-token";
import { UserDocument } from "src/infra/database/mongoose/schemas/user.schema";
import { User } from "src/domain/user/enterprise/entities/user.entity";
import request from "supertest";
import { weatherLogStub } from "test/stubs/weather-log.stub";
import { TWeatherLogControllerResponse } from "../schemas/weather-log-controller-request.schema";

const WEATHER_MODEL_TOKEN = getModelToken(WeatherLog.name);
const USER_MODEL_TOKEN = getModelToken(User.name);

describe("FindRecentLogController (E2E)", () => {
  let app: INestApplication;
  let weatherModel: Model<WeatherLogDocument>;
  let userModel: Model<UserDocument>;
  let accessToken: string;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AIInsightGenerator)
      .useClass(MockAIInsightGenerator)
      .compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    await app.init();

    weatherModel =
      moduleRef.get<Model<WeatherLogDocument>>(WEATHER_MODEL_TOKEN);
    userModel = moduleRef.get<Model<UserDocument>>(USER_MODEL_TOKEN);

    accessToken = await authenticateAndGetToken({ userModel, jwt });
  });

  beforeEach(async () => {
    await weatherModel.deleteMany({});
  });

  afterAll(async () => {
    await app.close();
  });

  describe("[GET]/weather-log/recent", () => {
    it("should be able to find the most recent weather log created", async () => {
      const { request: olderLog, id: olderLogId } = weatherLogStub({
        createdAt: new Date(2025, 1, 1),
      });
      await weatherModel.create({
        ...olderLog,
        createdAt: olderLog.createdAt,
        id: olderLogId,
      });

      const { request: recentLog, id: recentLogId } = weatherLogStub({
        createdAt: new Date(2025, 1, 2),
      });

      await weatherModel.create({
        ...recentLog,
        createdAt: recentLog.createdAt,
        id: recentLogId,
      });

      const weatherLogsList = await weatherModel.find();
      expect(weatherLogsList).toHaveLength(2);

      const response = await request(app.getHttpServer())
        .get("/weather-log/recent")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);

      const bodyResponse: TWeatherLogControllerResponse = response.body;
      expect(bodyResponse.id).toEqual(recentLogId);
    });
  });
});
