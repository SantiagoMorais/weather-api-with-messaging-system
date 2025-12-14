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
import { UniqueEntityId } from "src/core/entities/unique-entity-id";

const USER_MODEL_TOKEN = getModelToken(User.name);

describe("DeleteUserController (E2E)", () => {
  let app: INestApplication;
  let userModel: Model<UserDocument>;
  let accessToken: string;
  let jwt: JwtService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    await app.init();

    userModel = moduleRef.get<Model<UserDocument>>(USER_MODEL_TOKEN);

    accessToken = await authenticateAndGetToken({ userModel, jwt });
  });

  afterEach(async () => {
    await userModel.deleteMany({});
    await app.close();
  });

  describe("[DELETE]/users/delete", () => {
    it("should be able to delete an user", async () => {
      const usersList = await userModel.find();
      expect(usersList).toHaveLength(1);

      const response = await request(app.getHttpServer())
        .delete("/users/delete")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);

      const usersListUpdated = await userModel.find();
      expect(usersListUpdated).toHaveLength(0);
    });

    it("should not be able to delete a admin user", async () => {
      const adminUser = await userModel.create({
        roles: ["Role_Admin"],
        password: "John@1234",
        email: "johnDoe2@mail.com",
        name: "John Doe",
        id: new UniqueEntityId().toString(),
      });

      const newAccessToken = jwt.sign({ sub: adminUser.id });

      const response = await request(app.getHttpServer())
        .delete("/users/delete")
        .set("Authorization", `Bearer ${newAccessToken}`);

      expect(response.statusCode).toEqual(401);
    });
  });
});
