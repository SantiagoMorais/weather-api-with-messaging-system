import { HttpModule } from "@nestjs/axios";
import { Test, TestingModule } from "@nestjs/testing";
import { PokemonApiGatewayImplement } from "./pokemon-api-gateway-implement.service";

// ⚠️ Warning: This suite of test is testing real network call
describe("Pokemon API Gateway Service", () => {
  let pokemonGateway: PokemonApiGatewayImplement;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [PokemonApiGatewayImplement],
    }).compile();

    pokemonGateway = moduleRef.get<PokemonApiGatewayImplement>(
      PokemonApiGatewayImplement
    );
  });

  it("should fetch details for a known Pokemon and format it correctly", async () => {
    const result = await pokemonGateway.getByNameOrId("pikachu");

    expect(result).toBeDefined();
    expect(result.name).toBe("pikachu");
    expect(result._id).toBe(25);
    expect(result.types).toContain("electric");
    expect(result.habitat).toEqual(expect.any(String));
  }, 10000); // timeout 10 seconds

  it("should return formatted pagination links and data using findAll", async () => {
    const limit = 5;
    const offset = 0;
    const path = "/pokemons";

    const result = await pokemonGateway.findAll(limit, offset, path);

    expect(result.results.length).toBe(limit);
    expect(result.next).toContain(
      `${path}?limit=${limit}&offset=${offset + limit}`
    );
    expect(result.previous).toBeNull();
  }, 10000); // timeout 10 seconds
});
