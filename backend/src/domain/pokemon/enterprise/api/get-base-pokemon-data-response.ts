import { TPokemonSprites } from "src/core/types/pokemon/pokemon-sprites";
import { TPokemonStatName } from "src/core/types/pokemon/pokemon-stat-name";
import { TPokemonType } from "src/core/types/pokemon/pokemon-types";

export interface IGetBasePokemonDataResponse {
  id: number;
  name: string;
  sprites: TPokemonSprites;
  stats: {
    base_stat: number;
    stat: {
      name: TPokemonStatName;
    };
  }[];
  weight: number;
  height: number;
  types: { type: { name: TPokemonType } }[];
}
