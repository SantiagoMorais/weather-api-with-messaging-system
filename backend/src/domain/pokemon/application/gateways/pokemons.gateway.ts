import { IPokemonProps } from "src/core/interfaces/entities/pokemon-props";
import { IFetchAllPokemonsDataResponse } from "src/domain/pokemon/enterprise/interfaces/fetch-all-pokemons-data-response";
import { IPokemonFormattedBaseDetails } from "src/domain/pokemon/enterprise/interfaces/pokemon-formatted-base-details";

export abstract class PokemonGateway {
  abstract getByNameOrId(
    nameOrId: string | number
  ): Promise<IPokemonProps | null>;
  abstract getBaseByNameOrId(
    nameOrId: string | number
  ): Promise<IPokemonFormattedBaseDetails | null>;
  abstract findAll(
    limit: number,
    offset: number,
    baseEndpointPath: string | null
  ): Promise<IFetchAllPokemonsDataResponse>;
}
