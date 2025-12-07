import { IFetchAllPokemonsDataResponse } from "src/domain/pokemon/enterprise/interfaces/fetch-all-pokemons-data-response";

export interface IFindPokemonsControllerResponse {
  pokemons: IFetchAllPokemonsDataResponse;
}
