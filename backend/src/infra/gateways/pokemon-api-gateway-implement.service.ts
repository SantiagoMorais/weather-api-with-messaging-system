import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { PokemonGateway } from "src/domain/pokemon/application/gateways/pokemons.gateway";
import { IPokemonProps } from "src/core/interfaces/entities/pokemon-props";
import {
  IFetchAllPokemonsAPIResponse,
  IFetchAllPokemonsDataResponse,
  IPokemonFormattedBaseDetails,
} from "src/core/interfaces/services/fetch-all-pokemons-data-response";
import { IFetchPokemonsByType } from "src/core/interfaces/services/fetch-pokemons-by-type";
import { IGetBasePokemonDataResponse } from "src/core/interfaces/services/get-base-pokemon-data-response";
import { IGetPokemonSpeciesDataResponse } from "src/core/interfaces/services/get-pokemon-species-data-response";
import { TPokemonType } from "src/core/types/pokemon/pokemon-types";
import { extractIdFromPokeApiUrl } from "src/utils/extract-id-from-poke-api-url";
import { extractPaginationParams } from "src/utils/extract-pagination-params";

const BASE_URL_ENDPOINT = "/pokemons";

@Injectable()
export class PokemonApiGatewayImplement implements PokemonGateway {
  private baseUrl = "https://pokeapi.co/api/v2";

  constructor(private readonly httpService: HttpService) {}

  async getBaseByNameOrId(
    nameOrId: string | number
  ): Promise<IPokemonFormattedBaseDetails | null> {
    try {
      const base$ = this.httpService.get<IGetBasePokemonDataResponse>(
        `${this.baseUrl}/pokemon/${nameOrId}`
      );

      const baseRes = await firstValueFrom(base$);

      const baseData = baseRes.data;

      return {
        _id: baseData.id,
        name: baseData.name,
        image: baseData.sprites.front_default,
        weight: baseData.weight,
        height: baseData.height,
        types: baseData.types.map((t) => t.type.name),
      };
    } catch (error) {
      throw new Error("Error fetching Pokemon: " + error);
    }
  }

  async getByNameOrId(nameOrId: string | number): Promise<IPokemonProps> {
    try {
      const base$ = this.httpService.get<IGetBasePokemonDataResponse>(
        `${this.baseUrl}/pokemon/${nameOrId}`
      );
      const species$ = this.httpService.get<IGetPokemonSpeciesDataResponse>(
        `${this.baseUrl}/pokemon-species/${nameOrId}`
      );

      const [baseRes, speciesRes] = await Promise.all([
        firstValueFrom(base$),
        firstValueFrom(species$),
      ]);

      const baseData = baseRes.data;
      const speciesData = speciesRes.data;

      const englishDescriptionRaw =
        speciesData.flavor_text_entries.find((e) => e.language.name === "en")
          ?.flavor_text ?? "No description available.";

      const englishDescription = englishDescriptionRaw
        .replace(/[\n\f]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      const habitat = speciesData.habitat?.name ?? "unknown";

      return {
        _id: baseData.id,
        name: baseData.name,
        images: {
          frontDefault: baseData.sprites.front_default,
          frontShiny: baseData.sprites.front_shiny,
          frontFemale: baseData.sprites.front_female,
          frontShinyFemale: baseData.sprites.front_shiny_female,
          backDefault: baseData.sprites.back_default,
          backShiny: baseData.sprites.back_shiny,
          backFemale: baseData.sprites.back_female,
          backShinyFemale: baseData.sprites.back_shiny_female,
        },
        stats: baseData.stats.map((stat) => ({
          statName: stat.stat.name,
          value: stat.base_stat,
        })),
        weight: baseData.weight,
        height: baseData.height,
        description: englishDescription,
        habitat,
        types: baseData.types.map((t) => t.type.name),
        url: `${this.baseUrl}/pokemon/${nameOrId}`,
      };
    } catch (error) {
      throw new Error("Error fetching Pokemon: " + error);
    }
  }

  async findAll(
    limit: number,
    offset: number,
    baseEndpointPath?: string
  ): Promise<IFetchAllPokemonsDataResponse> {
    try {
      const params = new URLSearchParams();
      params.append("offset", offset.toString());
      params.append("limit", limit.toString());

      const res = await firstValueFrom(
        this.httpService.get<IFetchAllPokemonsAPIResponse>(
          `${this.baseUrl}/pokemon?${params.toString()}`
        )
      );

      const fetchMoreDetailsPromises = res.data.results.map(
        async ({ name }) => {
          const data = await this.getBaseByNameOrId(name);
          return data;
        }
      );

      const detailedResults = (await Promise.all(
        fetchMoreDetailsPromises
      )) as IPokemonFormattedBaseDetails[];

      const nextParams = extractPaginationParams(res.data.next);
      const previousParams = extractPaginationParams(res.data.previous);
      const nextUrl = nextParams
        ? `${baseEndpointPath ?? BASE_URL_ENDPOINT}?limit=${nextParams.limit}&offset=${nextParams.offset}`
        : null;

      const previousUrl = previousParams
        ? `${baseEndpointPath ?? BASE_URL_ENDPOINT}?limit=${previousParams.limit}&offset=${previousParams.offset}`
        : null;

      return {
        results: detailedResults,
        next: nextUrl,
        previous: previousUrl,
      };
    } catch (error) {
      throw new Error("Error fetching pokemon list: " + error);
    }
  }

  async findAllByType(type: TPokemonType): Promise<IFetchPokemonsByType> {
    try {
      const res = await firstValueFrom(
        this.httpService.get<{
          pokemon: { pokemon: { name: string; url: string }; slot: number }[];
        }>(`${this.baseUrl}/type/${type}`)
      );

      return {
        pokemons: res.data.pokemon.map((p) => ({
          name: p.pokemon.name,
          id: extractIdFromPokeApiUrl(p.pokemon.url),
          url: p.pokemon.url,
        })),
      };
    } catch (error) {
      throw new Error("Error fetching pokemons by type: " + error);
    }
  }
}
