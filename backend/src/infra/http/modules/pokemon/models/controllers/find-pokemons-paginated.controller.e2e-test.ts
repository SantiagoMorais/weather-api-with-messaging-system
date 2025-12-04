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
import { IFindPokemonsControllerResponse } from "../interfaces/find-pokemons-controller.response";

const USER_MODEL_TOKEN = getModelToken(User.name);

describe("Get pokemon details (E2E)", () => {
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
    await app.close();
  });

  describe("[GET]/pokemons", () => {
    it("should be able to find pokemons paginated", async () => {
      const response = await request(app.getHttpServer())
        .get("/pokemons")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          pokemons: expect.any(Object),
        })
      );

      const pokemonsList: IFindPokemonsControllerResponse = response.body;

      expect(pokemonsList.pokemons.results).toHaveLength(20);
    });

    it("should be able to limit and set an offset", async () => {
      const response = await request(app.getHttpServer())
        .get("/pokemons?limit=10&offset=100")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      const pokemonsList: IFindPokemonsControllerResponse = response.body;

      expect(pokemonsList.pokemons.results).toHaveLength(10);
      expect(pokemonsList.pokemons.results).toEqual(
        expect.arrayContaining([expect.objectContaining({ _id: 101 })])
      );
    });

    it("should be able to create another request with the next and previous data", async () => {
      const response = await request(app.getHttpServer())
        .get("/pokemons?limit=10&offset=100")
        .set("Authorization", `Bearer ${accessToken}`);

      const {
        pokemons: fistResponsePokemons,
      }: IFindPokemonsControllerResponse = response.body;

      const previousResponse = await request(app.getHttpServer())
        .get(fistResponsePokemons.previous!)
        .set("Authorization", `Bearer ${accessToken}`);

      const { pokemons }: IFindPokemonsControllerResponse =
        previousResponse.body;

      expect(previousResponse.statusCode).toBe(200);
      expect(pokemons.results).toHaveLength(10);
      expect(pokemons.results).toEqual(
        expect.arrayContaining([expect.objectContaining({ _id: 91 })])
      );
    });

    it("should not be able to previous the page when into the beginning", async () => {
      const response = await request(app.getHttpServer())
        .get("/pokemons")
        .set("Authorization", `Bearer ${accessToken}`);

      const { pokemons }: IFindPokemonsControllerResponse = response.body;

      expect(pokemons.previous).toBe(null);
    });
  });
});
