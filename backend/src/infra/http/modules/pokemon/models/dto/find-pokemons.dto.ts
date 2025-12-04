import { ApiProperty } from "@nestjs/swagger";
import { IFindPokemonsControllerParams } from "../interfaces/find-pokemons-controller.params";

export class FindPokemonsDTO implements IFindPokemonsControllerParams {
  @ApiProperty({
    description:
      "The limit/number of pokemons returned by page (The page size).",
    example: 15,
  })
  limit: number;

  @ApiProperty({
    description:
      "Determines the starting point of the list. It is the number of records to skip from the beginning.",
    example: 100,
  })
  offset: number;
}
