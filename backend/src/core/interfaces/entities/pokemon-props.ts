import { TPokemonImages } from "src/core/types/pokemon/pokemon-images";
import { TPokemonStatName } from "src/core/types/pokemon/pokemon-stat-name";
import { TPokemonType } from "src/core/types/pokemon/pokemon-types";

export interface IPokemonProps {
  _id: number;
  name: string;
  images: TPokemonImages;
  stats: Array<{
    statName: TPokemonStatName;
    value: number;
  }>;
  height: number;
  weight: number;
  types: TPokemonType[];
  habitat: string;
  description: string;
  url: string;
}
