import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FindAllPokemonsUseCase } from "src/domain/pokemon/application/use-cases/find-all-pokemons.usecase";

@ApiTags("Pokemons")
@Controller("/pokemons")
export class FindPokemonsPaginatedController {
  constructor(private findAllPokemonsUseCase: FindAllPokemonsUseCase) {}

  @Get("/:offset")
  async handle() {

  }
}
