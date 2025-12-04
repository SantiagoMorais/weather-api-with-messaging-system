import { IFetchAllPokemonsDataResponse } from "src/core/interfaces/services/fetch-all-pokemons-data-response";
import { IFindPokemonsControllerResponse } from "../interfaces/find-pokemons-controller.response";
import { ApiProperty } from "@nestjs/swagger";
import { PokemonFormattedBaseDetailsDTO } from "./pokemon-formatted-base-details.dto"; // Assumindo o nome do arquivo

export class FindAllPokemonsDataResponseDTO implements IFetchAllPokemonsDataResponse {
  @ApiProperty({
    description:
      "The URL to the next set of results, or null if this is the last page.",
    example: "http://api.myserver.com/pokemons?limit=20&offset=40",
    nullable: true,
  })
  next: string | null;

  @ApiProperty({
    description:
      "The URL to the previous set of results, or null if this is the first page.",
    example: "http://api.myserver.com/pokemons?limit=20&offset=0",
    nullable: true,
  })
  previous: string | null;

  @ApiProperty({
    description: "The list of formatted Pokémon details.",
    type: [PokemonFormattedBaseDetailsDTO],
  })
  results: PokemonFormattedBaseDetailsDTO[];
}

export class FindPokemonsResponseDTO implements IFindPokemonsControllerResponse {
  @ApiProperty({
    description: "Pagination and data object containing the list of pokemons.",
    type: FindAllPokemonsDataResponseDTO,
  })
  pokemons: FindAllPokemonsDataResponseDTO;
}
