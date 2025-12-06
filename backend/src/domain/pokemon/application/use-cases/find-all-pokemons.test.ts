import { InMemoryPokemonGateway } from "test/gateways/in-memory-pokemon-gateway";
import { FindAllPokemonsUseCase } from "./find-all-pokemons.usecase";
import { makePokemon } from "test/factories/make-pokemon";

let inMemoryPokemonGateway: InMemoryPokemonGateway;
let sut: FindAllPokemonsUseCase;

describe("GetPokemonByNameOrId use case", () => {
  beforeEach(() => {
    inMemoryPokemonGateway = new InMemoryPokemonGateway();
    sut = new FindAllPokemonsUseCase(inMemoryPokemonGateway);
  });

  it("should be able to find all pokemons paginated", async () => {
    for (let i = 0; i < 10; i++) {
      const { pokemon } = makePokemon({ id: i + 1 });
      inMemoryPokemonGateway.pokemons.push(pokemon);
    }
    const result = await sut.execute({ limit: 2, offset: 2 });

    expect(result.isSuccess()).toBe(true);
    expect(result.value?.pokemons.results).toHaveLength(2);
    expect(result.value?.pokemons.results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 3,
        }),
      ])
    );
  });

  it("should not return more than the limit of pokemons on the list", async () => {
    for (let i = 0; i < 10; i++) {
      const { pokemon } = makePokemon({ id: i + 1 });
      inMemoryPokemonGateway.pokemons.push(pokemon);
    }
    const result = await sut.execute({ limit: 10, offset: 8 });

    expect(result.value?.pokemons.results).toHaveLength(2);
  });

  it("should return 20 pokemons starting from the beginning when the params are omitted", async () => {
    for (let i = 0; i < 30; i++) {
      const { pokemon } = makePokemon({ id: i });
      inMemoryPokemonGateway.pokemons.push(pokemon);
    }
    const result = await sut.execute({});

    expect(result.value?.pokemons.results).toHaveLength(20);
  });
});
