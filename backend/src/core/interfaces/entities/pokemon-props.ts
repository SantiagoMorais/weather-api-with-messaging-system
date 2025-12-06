import { TPokemonImages } from "src/core/types/pokemon/pokemon-images";
import { TPokemonStatName } from "src/core/types/pokemon/pokemon-stat-name";
import { TPokemonType } from "src/core/types/pokemon/pokemon-types";

export interface IPokemonStat {
  statName: TPokemonStatName;
  value: number;
}

export interface IPokemonProps {
  id: number;
  name: string;
  images: TPokemonImages;
  stats: IPokemonStat[];
  height: number;
  weight: number;
  types: TPokemonType[];
  habitat: string;
  description?: string;
  url: string;
}
