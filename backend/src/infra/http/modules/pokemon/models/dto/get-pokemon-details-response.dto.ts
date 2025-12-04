import { ApiProperty } from "@nestjs/swagger";
import { GetPokemonControllerResponse } from "../interfaces/get-pokemon-controller.response";
import { PokemonPropsDTO } from "./pokemon-props.dto";

export class GetPokemonDetailsResponseDTO implements GetPokemonControllerResponse {
  @ApiProperty({
    description: "The data returned of a pokemon from the API.",
    type: PokemonPropsDTO,
  })
  pokemon: PokemonPropsDTO;
}
