import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Model } from "mongoose";
import { User } from "src/domain/user/enterprise/entities/user.entity";
import { AppModule } from "src/infra/app.module";
import { UserDocument } from "src/infra/database/mongoose/schemas/user.schema";
import request from "supertest";
import { authenticateAndGetToken } from "test/helpers/authenticate-and-get-token";

const USER_MODEL_TOKEN = getModelToken(User.name);

describe("UserProfileController (E2E)", () => {
  let app: INestApplication;
  let userModel: Model<UserDocument>;
  let accessToken: string;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    await app.init();

    userModel = moduleRef.get<Model<UserDocument>>(USER_MODEL_TOKEN);
  });

  beforeEach(async () => {
    await userModel.deleteMany({});

    accessToken = await authenticateAndGetToken({ userModel, jwt });
  });

  afterAll(async () => {
    await app.close();
  });

  it("[GET]/users/me", async () => {
    const response = await request(app.getHttpServer())
      .get("/users/me")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);

    const bodyResponse = response.body;

    expect(bodyResponse).toEqual(
      expect.objectContaining({
        createdAt: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        id: expect.any(String),
      })
    );
  });
});
