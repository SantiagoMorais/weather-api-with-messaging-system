import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosError } from "axios";
import { firstValueFrom } from "rxjs";
import { IPokemonProps } from "src/core/interfaces/entities/pokemon-props";
import {
  IFetchAllPokemonsAPIResponse,
  IFetchAllPokemonsDataResponse,
} from "src/core/interfaces/services/poke-api/fetch-all-pokemons-data-response";
import { IGetBasePokemonDataResponse } from "src/core/interfaces/services/poke-api/get-base-pokemon-data-response";
import { IGetPokemonSpeciesDataResponse } from "src/core/interfaces/services/poke-api/get-pokemon-species-data-response";
import { IPokemonFormattedBaseDetails } from "src/core/interfaces/services/poke-api/pokemon-formatted-base-details";
import { PokemonGateway } from "src/domain/pokemon/application/gateways/pokemons.gateway";
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
        id: baseData.id,
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
    baseEndpointPath: string | null
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

      const fetchMoreDetailsPromises = res.data.results.map(async ({ url }) => {
        const data = await this.fetchBaseByUrl(url);
        return data;
      });

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

  private async fetchBaseByUrl(
    url: string
  ): Promise<IPokemonFormattedBaseDetails | null> {
    try {
      const base$ = this.httpService.get<IGetBasePokemonDataResponse>(url);
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
      if (
        error instanceof AxiosError &&
        (error.response?.status === 404 || error.response?.status === 400)
      ) {
        return null;
      }
      throw new Error(`Error fetching Pokemon by URL (${url}): ${error}`);
    }
  }
}
