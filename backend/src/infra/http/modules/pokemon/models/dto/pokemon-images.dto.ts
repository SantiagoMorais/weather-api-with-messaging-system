import { ApiProperty } from "@nestjs/swagger";

export class PokemonImagesDTO {
  @ApiProperty({
    description:
      "URL for the Pokémon's default front sprite (male/genderless).",
    example:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    type: String,
    nullable: true,
  })
  frontDefault!: string | null;

  @ApiProperty({
    description: "URL for the Pokémon's shiny front sprite (male/genderless).",
    example:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
    type: String,
    nullable: true,
  })
  frontShiny!: string | null;

  @ApiProperty({
    description: "URL for the Pokémon's female front sprite.",
    example:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/3.png",
    type: String,
    nullable: true,
  })
  frontFemale!: string | null;

  @ApiProperty({
    description: "URL for the Pokémon's shiny female front sprite.",
    example:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/3.png",
    type: String,
    nullable: true,
  })
  frontShinyFemale!: string | null;

  @ApiProperty({
    description: "URL for the Pokémon's default back sprite (male/genderless).",
    example:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
    type: String,
    nullable: true,
  })
  backDefault!: string | null;

  @ApiProperty({
    description: "URL for the Pokémon's shiny back sprite (male/genderless).",
    example:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
    type: String,
    nullable: true,
  })
  backShiny!: string | null;

  @ApiProperty({
    description: "URL for the Pokémon's female back sprite.",
    example:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/3.png",
    type: String,
    nullable: true,
  })
  backFemale!: string | null;

  @ApiProperty({
    description: "URL for the Pokémon's shiny female back sprite.",
    example:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/3.png",
    type: String,
    nullable: true,
  })
  backShinyFemale!: string | null;
}
