import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Model } from "mongoose";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { User } from "src/domain/user/enterprise/entities/user.entity";
import { AIInsightGenerator } from "src/domain/weatherLog/application/services/ai-insight-generator.service";
import { WeatherLog } from "src/domain/weatherLog/enterprise/entities/weather-log.entity";
import { AppModule } from "src/infra/app.module";
import { UserDocument } from "src/infra/database/mongoose/schemas/user.schema";
import { WeatherLogDocument } from "src/infra/database/mongoose/schemas/weather-log.schema";
import request from "supertest";
import { authenticateAndGetToken } from "test/helpers/authenticate-and-get-token";
import { MockAIInsightGenerator } from "test/mocks/mock-ai-insight-generator";
import { weatherLogStub } from "test/stubs/weather-log.stub";
import { IFindManyWeatherLogsResponse } from "../interfaces/find-many-weather-logs-response";

const WEATHER_MODEL_TOKEN = getModelToken(WeatherLog.name);
const USER_MODEL_TOKEN = getModelToken(User.name);

describe("FindManyRecentLogController (E2E)", () => {
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

  describe("[GET]/weather-logs/:count", () => {
    it("should be able to find the recent logs", async () => {
      for (let i = 0; i < 5; i++) {
        const weatherLog = weatherLogStub();
        await weatherModel.create({
          ...weatherLog,
          _id: new UniqueEntityId(i.toString()).toString(),
        });
      }

      const response = await request(app.getHttpServer())
        .get("/weather-logs/3")
        .set("Authorization", `Bearer ${accessToken}`);

      const bodyResponse: IFindManyWeatherLogsResponse = response.body;

      expect(response.statusCode).toBe(200);
      expect(bodyResponse.weatherLogs).toHaveLength(3);
    });
  });
});
