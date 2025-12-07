import {
  IGetPokemonByNameOrIdUseCaseRequest,
  TGetPokemonByNameOrIdUseCaseResponse,
} from "src/domain/pokemon/enterprise/interfaces/get-pokemon-by-name-or-id-use-case";
import { PokemonGateway } from "../gateways/pokemons.gateway";
import { failure, success } from "src/core/result";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetPokemonByNameOrIdUseCase {
  constructor(private pokemonGateway: PokemonGateway) {}

  async execute({
    nameOrId,
  }: IGetPokemonByNameOrIdUseCaseRequest): Promise<TGetPokemonByNameOrIdUseCaseResponse> {
    const pokemon = await this.pokemonGateway.getByNameOrId(nameOrId);

    if (!pokemon)
      return failure(new DataNotFoundError(`Pokemon not found by ${nameOrId}`));

    return success({ pokemon });
  }
}
