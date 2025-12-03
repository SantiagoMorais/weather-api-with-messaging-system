import { INestApplication } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { Model } from "mongoose";
import { IUsersProps } from "src/core/interfaces/entities/users-props";
import { User } from "src/domain/user/enterprise/entities/user.entity";
import { AppModule } from "src/infra/app.module";
import request from "supertest";

const USER_MODEL_TOKEN = getModelToken(User.name);

describe("Create User (E2E)", () => {
  let app: INestApplication;
  let userModal: Model<User>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    userModal = moduleRef.get<Model<User>>(USER_MODEL_TOKEN);
  });

  afterAll(async () => {
    await userModal.deleteMany({});
    await app.close();
  });

  it("[POST]/users", async () => {
    const testEmail = "johndoe@mail.com";
    const response = await request(app.getHttpServer()).post("/users").send({
      name: "John Doe",
      email: testEmail,
      password: "John#1234",
      repeatPassword: "John#1234",
    });

    expect(response.statusCode).toBe(201);

    const userOnDatabase: IUsersProps | null = await userModal.findOne({
      email: testEmail,
    });

    expect(userOnDatabase).toBeTruthy();
    expect(userOnDatabase?.name).toBe("John Doe");
  });
});
