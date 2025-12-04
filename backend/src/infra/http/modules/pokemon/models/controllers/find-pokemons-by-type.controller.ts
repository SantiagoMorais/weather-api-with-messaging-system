import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
} from "@nestjs/common";
import { ApiOkResponse, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  pokemonTypes,
  type TPokemonType,
} from "src/core/types/pokemon/pokemon-types";
import { FindAllPokemonsByTypeUseCase } from "src/domain/pokemon/application/use-cases/find-all-pokemons-by-type.usecase";
import { FindPokemonsResponseDTO } from "../dto/find-pokemons-response.dto";
import { IFindPokemonsByTypeControllerResponse } from "../interfaces/find-pokemons-by-type-controller.response";

@ApiTags("Pokemons")
@Controller("/pokemons")
export class FindPokemonsByTypeController {
  constructor(
    private findAllPokemonsByTypeUseCase: FindAllPokemonsByTypeUseCase
  ) {}

  @Get("/:type")
  @HttpCode(200)
  @ApiOkResponse({
    description: "Ok - Pokemon found.",
    type: FindPokemonsResponseDTO,
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Zod validation error or invalid request.",
  })
  @ApiParam({
    name: "type",
    description: "The type of the pokemon. (e.g fire, water, ghost)",
    enum: pokemonTypes,
  })
  async handle(
    @Param("type") type: TPokemonType
  ): Promise<IFindPokemonsByTypeControllerResponse> {
    Logger.log(
      `Fetching pokemons by type ${type}`,
      "FindPokemonsByTypeController"
    );
    const result = await this.findAllPokemonsByTypeUseCase.execute({
      type,
    });

    if (result.isFailure()) {
      Logger.error(
        `Zod validation error. No pokemons found with type ${type}`,
        "FindPokemonsByTypeController"
      );

      throw new BadRequestException(
        "`Zod validation error. No pokemons found with type ${type}`"
      );
    }

    const { pokemons } = result.value;
    return { pokemons };
  }
}
