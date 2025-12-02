import { Injectable } from "@nestjs/common";
import { PokemonGateway } from "../gateways/pokemons-repository";
import {
  IFindAllPokemonsByTypeUseCaseRequest,
  TFindAllPokemonsByTypeUseCaseResponse,
} from "src/core/interfaces/use-cases/pokemon/find-all-pokemons-by-type-use-case";
import { success } from "src/core/result";

@Injectable()
export class FindAllPokemonsByTypeUseCase {
  constructor(private pokemonGateway: PokemonGateway) {}

  async execute({
    type,
  }: IFindAllPokemonsByTypeUseCaseRequest): Promise<TFindAllPokemonsByTypeUseCaseResponse> {
    const { pokemons } = await this.pokemonGateway.findAllByType(type);

    return success({ pokemons });
  }
}
