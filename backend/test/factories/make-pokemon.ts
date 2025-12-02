import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { IPokemonProps } from "src/core/interfaces/entities/pokemon-props";
import { Pokemon } from "src/domain/pokemon/enterprise/entities/pokemon";

export const makePokemon = (
  override: Partial<IPokemonProps> = {},
  id?: UniqueEntityId
) => {
  const pokemon: IPokemonProps = {
    _id: 1,
    description: "lorem ipsum",
    habitat: faker.location.continent.name,
    height: 1.25,
    weight: 43,
    name: faker.animal.petName.name,
    url: faker.internet.url.name,
    ...override,
    stats: override.stats ?? [
      { statName: "attack", value: 50 },
      { statName: "defense", value: 50 },
      { statName: "hp", value: 50 },
      { statName: "special-attack", value: 50 },
      { statName: "special-defense", value: 50 },
      { statName: "speed", value: 50 },
    ],
    types: override.types ?? ["dragon"],
    images: {
      backDefault: faker.internet.url.name,
      backFemale: faker.internet.url.name,
      backShiny: faker.internet.url.name,
      backShinyFemale: faker.internet.url.name,
      frontDefault: faker.internet.url.name,
      frontFemale: faker.internet.url.name,
      frontShiny: faker.internet.url.name,
      frontShinyFemale: faker.internet.url.name,
      ...override.images,
    },
  };

  const pokemonEntity = Pokemon.create(pokemon, id);

  return { pokemonEntity, pokemon };
};
