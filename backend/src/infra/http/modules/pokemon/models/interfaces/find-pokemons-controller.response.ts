import { IFetchAllPokemonsDataResponse } from "src/core/interfaces/services/poke-api/fetch-all-pokemons-data-response";

export interface IFindPokemonsControllerResponse {
  pokemons: IFetchAllPokemonsDataResponse;
}
