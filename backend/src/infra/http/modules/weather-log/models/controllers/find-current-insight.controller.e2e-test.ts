import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Model } from "mongoose";
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
import { FindCurrentInsightSwaggerDTO } from "../dto/find-current-insight-swagger.dto";

const WEATHER_MODEL_TOKEN = getModelToken(WeatherLog.name);
const USER_MODEL_TOKEN = getModelToken(User.name);

describe("FindCurrentInsightController (E2E)", () => {
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

  describe("[GET]/weather-log/insight", () => {
    it("should be able to get the current insight", async () => {
      const { request: weatherLog, id } = weatherLogStub({
        createdAt: new Date(),
      });
      await weatherModel.create({
        ...weatherLog,
        id,
      });

      const response = await request(app.getHttpServer())
        .get("/weather-log/insight")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);

      const bodyResponse: FindCurrentInsightSwaggerDTO = response.body;

      expect(bodyResponse.id).toEqual(id);
    });
  });
});
