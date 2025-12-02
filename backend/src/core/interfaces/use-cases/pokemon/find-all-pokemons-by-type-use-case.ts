import { Result } from "src/core/result";
import { TPokemonType } from "src/core/types/pokemon/pokemon-types";
import { IFetchPokemonsByType } from "../../services/fetch-pokemons-by-type";

export interface IFindAllPokemonsByTypeUseCaseRequest {
  type: TPokemonType;
}

export type TFindAllPokemonsByTypeUseCaseResponse = Result<
  null,
  IFetchPokemonsByType
>;
