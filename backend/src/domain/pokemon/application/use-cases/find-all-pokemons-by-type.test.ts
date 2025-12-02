import { InMemoryPokemonGateway } from "test/gateways/in-memory-pokemon-gateway";
import { FindAllPokemonsByTypeUseCase } from "./find-all-pokemons-by-type";
import { makePokemon } from "test/factories/make-pokemon";

let inMemoryPokemonGateway: InMemoryPokemonGateway;
let sut: FindAllPokemonsByTypeUseCase;

describe("GetPokemonByNameOrId use case", () => {
  beforeEach(() => {
    inMemoryPokemonGateway = new InMemoryPokemonGateway();
    sut = new FindAllPokemonsByTypeUseCase(inMemoryPokemonGateway);
  });

  it("should be able to find all pokemons by type", async () => {
    const pokemons = [
      ...Array.from(
        { length: 2 },
        () => makePokemon({ types: ["bug"] }).pokemon
      ),
      ...Array.from(
        { length: 3 },
        (_, i) =>
          makePokemon({ types: ["dark"], name: `pokemon-${i + 1}` }).pokemon
      ),
      ...Array.from(
        { length: 4 },
        () => makePokemon({ types: ["dragon"] }).pokemon
      ),
    ];

    inMemoryPokemonGateway.pokemons.push(...pokemons);

    const result = await sut.execute({ type: "dark" });

    expect(result.isSuccess()).toBe(true);
    expect(result.value?.pokemons).toHaveLength(3);
    expect(result.value?.pokemons).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "pokemon-1" })])
    );
  });
});
