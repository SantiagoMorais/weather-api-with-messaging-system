import type { TPokemonImages } from "./pokemon-images";
import type { TPokemonStatName } from "./pokemon-stats-name";
import type { TPokemonType } from "./pokemon-types";

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
