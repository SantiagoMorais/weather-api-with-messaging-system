import { TPokemonStatName } from "src/core/types/pokemon/pokemon-stat-name";
import { TPokemonType } from "src/core/types/pokemon/pokemon-types";

export interface IPokemonProps {
  _id: number;
  name: string;
  images: {
    frontDefault: string | null;
    frontShiny: string | null;
    frontFemale: string | null;
    frontShinyFemale: string | null;
    backDefault: string | null;
    backShiny: string | null;
    backFemale: string | null;
    backShinyFemale: string | null;
  };
  stats: Array<{
    statName: TPokemonStatName;
    value: number;
  }>;
  height: number;
  weight: number;
  types: TPokemonType[];
  habitat: string;
  description: string;
}
