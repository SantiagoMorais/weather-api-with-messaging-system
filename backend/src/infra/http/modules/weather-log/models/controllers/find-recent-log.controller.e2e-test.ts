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
import { TWeatherLogControllerRequest } from "../schemas/weather-log-controller-request.schema";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";

const WEATHER_MODEL_TOKEN = getModelToken(WeatherLog.name);
const USER_MODEL_TOKEN = getModelToken(User.name);

describe("FindRecentLogController", () => {
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

  describe("[GET]/weather-log/recent", () => {
    it.skip("should be able to find the last created weather log", async () => {
      const weatherLog = weatherLogStub();
      await weatherModel.create({
        ...weatherLog,
        _id: new UniqueEntityId().toString(),
      });

      const logOnDatabase = await weatherModel.findOne();
      expect(logOnDatabase).toBeTruthy();

      const response = await request(app.getHttpServer())
        .get("/weather-log/recent")
        .set("Authorization", `Bearer ${accessToken}`);

      const bodyResponse: TWeatherLogControllerRequest = response.body;

      expect(response.statusCode).toBe(200);
      expect(bodyResponse.hourlyObservationStats).toBeDefined();
    });
  });
});
