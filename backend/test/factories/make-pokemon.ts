import { faker } from "@faker-js/faker";
import { IPokemonProps } from "src/core/interfaces/entities/pokemon-props";

export const makePokemon = (override: Partial<IPokemonProps> = {}) => {
  const pokemon: IPokemonProps = {
    id: 1,
    description: "lorem ipsum",
    habitat: faker.location.continent(),
    height: 1.25,
    weight: 43,
    name: faker.animal.petName(),
    url: faker.internet.url(),
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
      backDefault: faker.internet.url(),
      backFemale: faker.internet.url(),
      backShiny: faker.internet.url(),
      backShinyFemale: faker.internet.url(),
      frontDefault: faker.internet.url(),
      frontFemale: faker.internet.url(),
      frontShiny: faker.internet.url(),
      frontShinyFemale: faker.internet.url(),
      ...override.images,
    },
  };

  return { pokemon };
};
