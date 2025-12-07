import {
  IFindAllPokemonsUseCaseRequest,
  TFindAllPokemonsUseCaseResponse,
} from "src/domain/pokemon/enterprise/interfaces/find-all-pokemons-use-case";
import { PokemonGateway } from "../gateways/pokemons.gateway";
import { success } from "src/core/result";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindAllPokemonsUseCase {
  constructor(private pokemonGateway: PokemonGateway) {}

  async execute({
    limit,
    offset,
    baseUrlPath,
  }: IFindAllPokemonsUseCaseRequest): Promise<TFindAllPokemonsUseCaseResponse> {
    const pokemons = await this.pokemonGateway.findAll(
      limit ?? 20,
      offset ?? 0,
      baseUrlPath ?? null
    );

    return success({
      pokemons,
    });
  }
}
