import { IPokemonProps } from "src/core/interfaces/entities/pokemon-props";
import {
  IFetchAllPokemonsDataResponse,
  IPokemonFormattedBaseDetails,
} from "src/core/interfaces/services/fetch-all-pokemons-data-response";
import { IFetchPokemonsByType } from "src/core/interfaces/services/fetch-pokemons-by-type";
import { TPokemonType } from "src/core/types/pokemon/pokemon-types";

export abstract class PokemonGateway {
  abstract getByNameOrId(
    nameOrId: string | number
  ): Promise<IPokemonProps | null>;
  abstract getBaseByNameOrId(
    nameOrId: string | number
  ): Promise<IPokemonFormattedBaseDetails | null>;
  abstract findAll(
    limit: number,
    offset: number
  ): Promise<IFetchAllPokemonsDataResponse>;
  abstract findAllByType(type: TPokemonType): Promise<IFetchPokemonsByType>;
}
