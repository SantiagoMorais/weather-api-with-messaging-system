import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Logger,
  Query,
} from "@nestjs/common";
import { ApiOkResponse, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FindAllPokemonsUseCase } from "src/domain/pokemon/application/use-cases/find-all-pokemons.usecase";
import { IFindPokemonsControllerResponse } from "../interfaces/find-pokemons-controller.response";
import { FindPokemonsResponseDTO } from "../dto/find-pokemons-response.dto";

@ApiTags("Pokemons")
@Controller("/pokemons")
export class FindPokemonsPaginatedController {
  constructor(private findAllPokemonsUseCase: FindAllPokemonsUseCase) {}

  @Get()
  @HttpCode(200)
  @ApiQuery({
    name: "limit",
    required: false,
    type: Number,
    description: "The maximum number of pokemons to return (default: 20)",
  })
  @ApiQuery({
    name: "offset",
    required: false,
    type: Number,
    description: "The number of items to skip for pagination (default: 0).",
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Zod validation error or invalid request.",
  })
  @ApiOkResponse({
    description: "Ok - Pokemons found.",
    type: FindPokemonsResponseDTO,
  })
  async handle(
    @Query("limit") limitQuery?: string,
    @Query("offset") offsetQuery?: string
  ): Promise<IFindPokemonsControllerResponse> {
    Logger.log("Getting pokemons", "FindPokemonsPaginatedController");
    const pokemonsList = await this.findAllPokemonsUseCase.execute({
      limit: limitQuery ? Number(limitQuery) : undefined,
      offset: offsetQuery ? Number(offsetQuery) : undefined,
      baseUrlPath: "/pokemons",
    });

    if (pokemonsList.isFailure()) {
      Logger.error("Pokemons not returned", "FindPokemonsPaginatedController");
      throw new BadRequestException(
        "Zod validation error or unexpected error."
      );
    }

    Logger.log("Pokemons list got.", "FindPokemonsPaginatedController");
    const pokemons = pokemonsList.value;

    return pokemons;
  }
}
