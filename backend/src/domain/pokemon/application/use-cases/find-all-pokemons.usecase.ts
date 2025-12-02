import {
  IFindAllPokemonsUseCaseRequest,
  TFindAllPokemonsUseCaseResponse,
} from "src/core/interfaces/use-cases/pokemon/find-all-pokemons-use-case";
import { PokemonGateway } from "../gateways/pokemons.gateway";
import { success } from "src/core/result";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindAllPokemonsUseCase {
  constructor(private pokemonGateway: PokemonGateway) {}

  async execute({
    limit,
    offset,
  }: IFindAllPokemonsUseCaseRequest): Promise<TFindAllPokemonsUseCaseResponse> {
    const pokemons = await this.pokemonGateway.findAll(limit, offset);

    return success({
      pokemons,
    });
  }
}
