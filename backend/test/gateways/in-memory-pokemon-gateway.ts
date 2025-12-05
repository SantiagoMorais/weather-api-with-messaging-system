/* eslint-disable @typescript-eslint/require-await */
import { IPokemonProps } from "src/core/interfaces/entities/pokemon-props";
import { IFetchAllPokemonsDataResponse } from "src/core/interfaces/services/fetch-all-pokemons-data-response";
import { IPokemonFormattedBaseDetails } from "src/core/interfaces/services/pokemon-formatted-base-details";

import { PokemonGateway } from "src/domain/pokemon/application/gateways/pokemons.gateway";

export class InMemoryPokemonGateway implements PokemonGateway {
  public pokemons: IPokemonProps[] = [];

  async getBaseByNameOrId(
    nameOrId: string | number
  ): Promise<IPokemonFormattedBaseDetails | null> {
    const pokemon = this.pokemons.find((p) =>
      typeof nameOrId === "string" ? p.name === nameOrId : p._id === nameOrId
    );

    if (!pokemon) return null;

    return {
      ...pokemon,
      image: pokemon.images.frontDefault,
    };
  }

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
        _id: pokemon._id,
        height: pokemon.height,
        name: pokemon.name,
        types: pokemon.types,
        weight: pokemon.weight,
        image: pokemon.images.frontDefault,
      })),
      next: nextItem ? nextItem.url : null,
      previous: prevItem ? prevItem.url : null,
    };

    return data;
  }
}
