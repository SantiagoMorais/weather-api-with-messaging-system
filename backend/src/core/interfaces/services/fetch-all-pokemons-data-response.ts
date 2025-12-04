import { TPokemonType } from "src/core/types/pokemon/pokemon-types";

export interface IFetchAllPokemonsAPIResponse {
  results: { name: string; url: string }[];
  next: string | null;
  previous: string | null;
}

export interface IPokemonFormattedBaseDetails {
  _id: number;
  name: string;
  image?: string | null;
  types: TPokemonType[];
  height: number;
  weight: number;
}

export interface IFetchAllPokemonsDataResponse {
  results: IPokemonFormattedBaseDetails[];
  next: string | null;
  previous: string | null;
}
