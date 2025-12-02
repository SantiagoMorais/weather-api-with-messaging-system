/* eslint-disable @typescript-eslint/require-await */
import { IPokemonProps } from "src/core/interfaces/entities/pokemon-props";
import { IFetchAllPokemonsDataResponse } from "src/core/interfaces/services/fetch-all-pokemons-data-response";
import { IFetchPokemonsByType } from "src/core/interfaces/services/fetch-pokemons-by-type";
import { TPokemonType } from "src/core/types/pokemon/pokemon-types";
import { PokemonGateway } from "src/domain/pokemon/application/gateways/pokemons.gateway";

export class InMemoryPokemonGateway implements PokemonGateway {
  public pokemons: IPokemonProps[] = [];

  async getByNameOrId(
    nameOrId: string | number
  ): Promise<IPokemonProps | null> {
    const itsName = typeof nameOrId === "string";
    const pokemon = this.pokemons.find((p) =>
      itsName ? p.name === nameOrId : p._id === nameOrId
    );

    if (!pokemon) return null;

    return pokemon;
  }

  async findAll(
    limit: number,
    offset: number
  ): Promise<IFetchAllPokemonsDataResponse> {
    const start = offset;
    const end = offset + limit;

    const pokemons = this.pokemons.slice(start, end);

    const nextItem = this.pokemons[offset + limit];
    const prevItem = this.pokemons[offset - 1];

    const data: IFetchAllPokemonsDataResponse = {
      results: pokemons.map((pokemon) => ({
        name: pokemon.name,
        url: pokemon.url,
      })),
      next: nextItem ? nextItem.url : null,
      previous: prevItem ? prevItem.url : null,
    };

    return data;
  }

  async findAllByType(type: TPokemonType): Promise<IFetchPokemonsByType> {
    const pokemons = this.pokemons.filter((pokemon) =>
      pokemon.types.some((pokeType) => pokeType === type)
    );

    return {
      pokemons: pokemons.map((pokemon) => ({
        id: pokemon._id,
        name: pokemon.name,
        url: pokemon.url,
      })),
    };
  }
}
