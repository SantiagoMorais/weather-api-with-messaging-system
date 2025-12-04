import { Result } from "src/core/result";
import { IFetchAllPokemonsDataResponse } from "../../services/fetch-all-pokemons-data-response";

export interface IFindAllPokemonsUseCaseRequest {
  limit?: number;
  offset?: number;
}

export type TFindAllPokemonsUseCaseResponse = Result<
  null,
  { pokemons: IFetchAllPokemonsDataResponse }
>;
