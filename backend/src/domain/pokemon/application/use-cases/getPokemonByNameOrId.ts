import {
  IGetPokemonByNameOrIdUseCaseRequest,
  TGetPokemonByNameOrIdUseCaseResponse,
} from "src/core/interfaces/use-cases/pokemon/get-pokemon-by-name-or-id-use-case";
import { PokemonGateway } from "../gateways/pokemons-repository";
import { failure, success } from "src/core/result";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";

export class GetPokemonByNameOrIdUseCase {
  constructor(private pokemonGateway: PokemonGateway) {}

  async executeSchedule({
    nameOrId,
  }: IGetPokemonByNameOrIdUseCaseRequest): Promise<TGetPokemonByNameOrIdUseCaseResponse> {
    const pokemon = await this.pokemonGateway.getByNameOrId(nameOrId);

    if (!pokemon)
      return failure(new DataNotFoundError(`Pokemon not found by ${nameOrId}`));

    return success({ pokemon });
  }
}
