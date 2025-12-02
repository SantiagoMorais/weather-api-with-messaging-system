import { PokemonGateway } from "../gateways/pokemons-repository";

export class GetPokemonByNameOrIdUseCase {
  constructor(private pokemonGateway: PokemonGateway) {}
}
