import { ApiProperty } from "@nestjs/swagger";
import { IFindAllPokemonsUseCaseRequest } from "src/core/interfaces/use-cases/pokemon/find-all-pokemons-use-case";

export class FindPokemonsDTO implements IFindAllPokemonsUseCaseRequest {
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
