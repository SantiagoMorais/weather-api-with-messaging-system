import { IPokemonFormattedBaseDetails } from "src/core/interfaces/services/poke-api/pokemon-formatted-base-details";

export interface IFindPokemonsByTypeControllerResponse {
  pokemons: IPokemonFormattedBaseDetails[];
}
