import { ApiProperty } from "@nestjs/swagger";
import { IPokemonFormattedBaseDetails } from "src/domain/pokemon/enterprise/interfaces/pokemon-formatted-base-details";
import {
  pokemonTypes,
  TPokemonType,
} from "src/core/types/pokemon/pokemon-types";

export class PokemonFormattedBaseDetailsDTO implements IPokemonFormattedBaseDetails {
  @ApiProperty({
    description: "The unique ID of the Pokémon.",
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: "The name of the Pokémon.",
    example: "bulbasaur",
  })
  name: string;

  @ApiProperty({
    description: "The URL of the front default sprite for the Pokémon.",
    example:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    nullable: true,
  })
  image?: string | null;

  @ApiProperty({
    description: "The primary types of the Pokémon.",
    isArray: true,
    enum: pokemonTypes,
    example: ["grass", "poison"],
  })
  types: TPokemonType[];

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
}
