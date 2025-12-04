import { ApiProperty } from "@nestjs/swagger";
import { TGetPokemonControllerRequest } from "../schemas/get-pokemon-body-schema";

export class GetPokemonDetailsDTO implements TGetPokemonControllerRequest {
  @ApiProperty({
    description: "The name or the number id of it.",
    example: `The name, as "Charmander" or its id number, as 9`,
    required: true,
  })
  nameOrId: string | number;
}
