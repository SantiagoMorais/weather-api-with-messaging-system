import { IPokemonFormattedBaseDetails } from "./pokemon-formatted-base-details";

export interface IFetchAllPokemonsAPIResponse {
  results: { name: string; url: string }[];
  next: string | null;
  previous: string | null;
}

export interface IFetchAllPokemonsDataResponse {
  results: IPokemonFormattedBaseDetails[];
  next: string | null;
  previous: string | null;
}
