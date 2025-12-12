import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Model } from "mongoose";
import { User } from "src/domain/user/enterprise/entities/user.entity";
import { AppModule } from "src/infra/app.module";
import { UserDocument } from "src/infra/database/mongoose/schemas/user.schema";
import { authenticateAndGetToken } from "test/helpers/authenticate-and-get-token";
import request from "supertest";

const USER_MODEL_TOKEN = getModelToken(User.name);

describe("DeleteUserController (E2E)", () => {
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

    accessToken = await authenticateAndGetToken({ userModel, jwt });
  });

  afterAll(async () => {
    await userModel.deleteMany({});
    await app.close();
  });

  test("[DELETE]/users/delete", async () => {
    const usersList = await userModel.find();
    expect(usersList).toHaveLength(1);

    const response = await request(app.getHttpServer())
      .delete("/users/delete")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);

    const usersListUpdated = await userModel.find();
    expect(usersListUpdated).toHaveLength(0);
  });
});
