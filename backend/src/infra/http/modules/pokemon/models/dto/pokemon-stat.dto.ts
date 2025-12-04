import { ApiProperty } from "@nestjs/swagger";
import { IPokemonStat } from "src/core/interfaces/entities/pokemon-props";
import {
  pokemonStatsName,
  type TPokemonStatName,
} from "src/core/types/pokemon/pokemon-stat-name";

export class PokemonStatDTO implements IPokemonStat {
  @ApiProperty({
    description: "The name of the stat (e.g., 'hp', 'attack')",
    enum: pokemonStatsName,
    example: "attack",
  })
  statName: TPokemonStatName;

  @ApiProperty({ description: "The base value of the stat.", example: 49 })
  value: number;
}
