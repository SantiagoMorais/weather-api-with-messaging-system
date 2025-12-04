import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { GetPokemonByNameOrIdUseCase } from "src/domain/pokemon/application/use-cases/get-pokemon-by-name-or-id.usecase";
import { GetPokemonDetailsDTO } from "../dto/get-pokemon-details.dto";
import { GetPokemonControllerResponse } from "../interfaces/get-pokemon-controller.response";
import {
  getPokemonBodySchema,
  type TGetPokemonControllerRequest,
} from "../schemas/get-pokemon-body-schema";
import { GetPokemonDetailsResponseDTO } from "../dto/get-pokemon-details-response.dto";

@ApiTags("Pokemons")
@Controller("/pokemons")
export class GetPokemonDetailsController {
  constructor(private getPokemonDetailsUseCase: GetPokemonByNameOrIdUseCase) {}

  @Get("/details")
  @HttpCode(200)
  @ApiOkResponse({
    description: "Ok - Pokemon found.",
    type: GetPokemonDetailsResponseDTO,
  })
  @ApiResponse({
    status: 404,
    description: "Not found - Pokemon name or id don't match.",
  })
  @ApiBody({ type: GetPokemonDetailsDTO })
  async handle(
    @Body(getPokemonBodySchema) body: TGetPokemonControllerRequest
  ): Promise<GetPokemonControllerResponse> {
    const { nameOrId } = body;

    Logger.log("Start getting pokemon data", "GetPokemonDetailsController");

    const result = await this.getPokemonDetailsUseCase.execute({
      nameOrId,
    });

    if (result.isFailure()) {
      const error = result.value;

      Logger.error(error.message, "GetPokemonDetailsController");

      switch (error.constructor) {
        case DataNotFoundError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException();
      }
    }
    Logger.log("Pokemon data received.", "GetPokemonDetailsController");

    const pokemon = result.value;
    return pokemon;
  }
}
