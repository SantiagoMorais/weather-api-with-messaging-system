import type { TPokemonType } from "./pokemon-types";

export interface IPokemonFormattedBaseDetails {
  id: number;
  name: string;
  image?: string | null;
  types: TPokemonType[];
  height: number;
  weight: number;
}

export interface IFetchAllPokemonsDataResponse {
  pokemons: {
    results: IPokemonFormattedBaseDetails[];
    next: string | null;
    previous: string | null;
  };
}
