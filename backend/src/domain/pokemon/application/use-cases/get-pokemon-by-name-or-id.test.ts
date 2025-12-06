import { InMemoryPokemonGateway } from "test/gateways/in-memory-pokemon-gateway";
import { GetPokemonByNameOrIdUseCase } from "./get-pokemon-by-name-or-id.usecase";
import { makePokemon } from "test/factories/make-pokemon";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";

let inMemoryPokemonGateway: InMemoryPokemonGateway;
let sut: GetPokemonByNameOrIdUseCase;

describe("GetPokemonByNameOrId use case", () => {
  beforeEach(() => {
    inMemoryPokemonGateway = new InMemoryPokemonGateway();
    sut = new GetPokemonByNameOrIdUseCase(inMemoryPokemonGateway);
  });

  it("should be able to get a pokemon by name or id", async () => {
    for (let i = 0; i < 6; i++) {
      const { pokemon } = makePokemon({ id: i + 1, name: `pokemon-${i + 1}` });
      inMemoryPokemonGateway.pokemons.push(pokemon);
    }

    const result1 = await sut.execute({ nameOrId: "pokemon-1" });
    expect(result1.isSuccess()).toBe(true);
    expect(result1.value).toEqual({
      pokemon: expect.objectContaining({
        name: "pokemon-1",
      }),
    });

    const result2 = await sut.execute({ nameOrId: 4 });
    expect(result2.isSuccess()).toBe(true);
    expect(result2.value).toEqual({
      pokemon: expect.objectContaining({
        name: "pokemon-4",
      }),
    });
  });

  it("should not be able to get a pokemon with invalid name or id", async () => {
    const result = await sut.execute({ nameOrId: "non-existed-pokemon" });

    expect(result.isFailure()).toBe(true);
    expect(result.value).toBeInstanceOf(DataNotFoundError);
  });
});
