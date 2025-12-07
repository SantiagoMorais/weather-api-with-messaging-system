import { IPokemonFormattedBaseDetails } from "src/domain/pokemon/enterprise/interfaces/pokemon-formatted-base-details";

export interface IFindPokemonsByTypeControllerResponse {
  pokemons: IPokemonFormattedBaseDetails[];
}
