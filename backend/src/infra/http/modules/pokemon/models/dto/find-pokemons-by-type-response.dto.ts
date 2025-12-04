import { ApiProperty } from "@nestjs/swagger";
import { PokemonFormattedBaseDetailsDTO } from "./pokemon-formatted-base-details.dto";
import { IFindPokemonsByTypeControllerResponse } from "../interfaces/find-pokemons-by-type-controller.response";

export class FindPokemonsResponseDTO implements IFindPokemonsByTypeControllerResponse {
  @ApiProperty({
    description: "The list of pokemons with basic data.",
    type: [PokemonFormattedBaseDetailsDTO],
  })
  pokemons: PokemonFormattedBaseDetailsDTO[];
}
