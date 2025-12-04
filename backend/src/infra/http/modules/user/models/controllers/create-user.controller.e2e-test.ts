import { INestApplication } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { Model } from "mongoose";
import { randomUUID } from "node:crypto";
import { User } from "src/domain/user/enterprise/entities/user.entity";
import { AppModule } from "src/infra/app.module";
import { UserDocument } from "src/infra/database/mongoose/schemas/user.schema";
import request from "supertest";
import { TCreateUserControllerRequest } from "../schemas/create-user-body-schema";

const USER_MODEL_TOKEN = getModelToken(User.name);

describe("Create User (E2E)", () => {
  let app: INestApplication;
  let userModel: Model<UserDocument>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    userModel = moduleRef.get<Model<UserDocument>>(USER_MODEL_TOKEN);
  });

  beforeEach(async () => {
    await userModel.deleteMany({});
  });

  afterAll(async () => {
    await app.close();
  });

  describe("[POST]/users", () => {
    it("should be able to create an user", async () => {
      const testEmail = randomUUID() + "@test.com";
      const response = await request(app.getHttpServer()).post("/users").send({
        name: "John Doe",
        email: testEmail,
        password: "John#1234",
        repeatPassword: "John#1234",
      });

      expect(response.statusCode).toBe(201);

      const userOnDatabase: TCreateUserControllerRequest | null =
        await userModel.findOne({
          email: testEmail,
        });

      expect(userOnDatabase).toBeTruthy();
      expect(userOnDatabase?.name).toBe("John Doe");
    });

    it("should not be able to create an user with password without special characters", async () => {
      const testEmail = randomUUID().slice(6) + "@test.com";
      const response = await request(app.getHttpServer()).post("/users").send({
        name: "John Doe",
        email: testEmail,
        password: "12345678",
        repeatPassword: "12345678",
      });

      expect(response.statusCode).toBe(400);
    });
  });
});
