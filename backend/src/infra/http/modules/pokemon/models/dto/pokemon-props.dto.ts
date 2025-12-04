import { ApiProperty } from "@nestjs/swagger";
import { type IPokemonProps } from "src/core/interfaces/entities/pokemon-props";
import {
  pokemonTypes,
  TPokemonType,
} from "src/core/types/pokemon/pokemon-types";
import { PokemonImagesDTO } from "./pokemon-images.dto";
import { PokemonStatDTO } from "./pokemon-stat.dto";

export class PokemonPropsDTO implements IPokemonProps {
  @ApiProperty({
    description: "The unique ID of the Pokémon.",
    example: 1,
  })
  _id: number;

  @ApiProperty({
    description: "The name of the Pokémon.",
    example: "bulbasaur",
  })
  name: string;

  @ApiProperty({
    description: "Sprite URLs for the Pokémon.",
    type: PokemonImagesDTO,
  })
  images: PokemonImagesDTO;

  @ApiProperty({
    description: "List of the Pokémon's base stats.",
    type: [PokemonStatDTO],
  })
  stats: PokemonStatDTO[];

  @ApiProperty({
    description: "The height of the Pokémon in decimetres (dm).",
    example: 7,
  })
  height: number;

  @ApiProperty({
    description: "The weight of the Pokémon in hectograms (hg).",
    example: 69,
  })
  weight: number;

  @ApiProperty({
    description: "The primary types of the Pokémon.",
    isArray: true,
    enum: pokemonTypes,
    example: ["grass", "poison"],
  })
  types: TPokemonType[];

  @ApiProperty({
    description: "The natural habitat of the Pokémon.",
    example: "grassland",
    nullable: true,
  })
  habitat: string;

  @ApiProperty({
    description: "A short description or Pokedex entry.",
    example:
      "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.",
    nullable: true,
  })
  description?: string;

  @ApiProperty({
    description: "The URL of the API resource (useful for HATEOAS).",
    example: "https://pokeapi.co/api/v2/pokemon/1/",
  })
  url: string;
}
