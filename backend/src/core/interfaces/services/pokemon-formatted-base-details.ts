import { TPokemonType } from "src/core/types/pokemon/pokemon-types";

export interface IPokemonFormattedBaseDetails {
  _id: number;
  name: string;
  image?: string | null;
  types: TPokemonType[];
  height: number;
  weight: number;
}
