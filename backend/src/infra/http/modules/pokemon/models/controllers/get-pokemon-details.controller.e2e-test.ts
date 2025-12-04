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

describe("Get pokemon details (E2E)", () => {
  let app: INestApplication;
  let userModal: Model<UserDocument>;
  let accessToken: string;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    await app.init();

    userModal = moduleRef.get<Model<UserDocument>>(USER_MODEL_TOKEN);

    accessToken = await authenticateAndGetToken({ userModal, jwt });
  });

  afterAll(async () => {
    await app.close();
  });

  it("[GET]/pokemons/details", async () => {
    const response = await request(app.getHttpServer())
      .get("/pokemons/charmander")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        pokemon: expect.objectContaining({
          name: "charmander",
        }),
      })
    );
  });
});
