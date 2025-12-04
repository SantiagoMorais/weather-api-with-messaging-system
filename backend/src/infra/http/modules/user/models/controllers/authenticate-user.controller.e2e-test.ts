import { INestApplication } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { hash } from "bcrypt";
import { Model } from "mongoose";
import { IUsersProps } from "src/core/interfaces/entities/users-props";
import { User } from "src/domain/user/enterprise/entities/user.entity";
import { AppModule } from "src/infra/app.module";
import { UserDocument } from "src/infra/database/mongoose/schemas/user.schema";
import request from "supertest";
import { userStub } from "test/stubs/user.stub";

const USER_MODEL_TOKEN = getModelToken(User.name);

describe("Authenticate User (E2E)", () => {
  let app: INestApplication;
  let userModal: Model<UserDocument>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    userModal = moduleRef.get<Model<UserDocument>>(USER_MODEL_TOKEN);
  });

  beforeEach(async () => {
    await userModal.deleteMany({});
  });

  afterAll(async () => {
    await app.close();
  });

  test("[POST]/users/auth", async () => {
    const user = userStub();
    await userModal.create({ ...user, password: await hash(user.password, 8) });

    const userOnDatabase: IUsersProps | null = await userModal.findOne({
      email: user.email,
    });

    expect(userOnDatabase).toBeTruthy();

    const response = await request(app.getHttpServer())
      .post("/users/auth")
      .send({
        email: user.email,
        password: user.password,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      access_token: expect.any(String),
    });
  });
});
