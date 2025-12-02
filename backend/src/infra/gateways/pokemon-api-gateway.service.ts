import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { IPokemonProps } from "src/core/interfaces/entities/pokemon-props";
import { IGetBasePokemonDataResponse } from "src/core/interfaces/services/get-base-pokemon-data-response";
import { IGetPokemonSpeciesDataResponse } from "src/core/interfaces/services/get-pokemon-species-data-response";
import { forkJoin, Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { IFetchAllPokemonsDataResponse } from "src/core/interfaces/services/fetch-all-pokemons-data-response";
import { TPokemonType } from "src/core/types/pokemon/pokemon-types";
import { IFetchPokemonsByType } from "src/core/interfaces/services/fetch-pokemons-by-type";
import { extractIdFromPokeApiUrl } from "src/utils/extractIfFromPokeApiUrl";

@Injectable()
export class PokemonApiGateway {
  private baseUrl = "https://pokeapi.co/api/v2";

  constructor(private readonly httpService: HttpService) {}

  getPokemonByNameOrId({
    nameOrId,
  }: {
    nameOrId: string | number;
  }): Observable<IPokemonProps> {
    const baseData$ = this.httpService
      .get<IGetBasePokemonDataResponse>(`${this.baseUrl}/pokemon/${nameOrId}`)
      .pipe(map((res) => res.data));

    const speciesData$ = this.httpService
      .get<IGetPokemonSpeciesDataResponse>(
        `${this.baseUrl}/pokemon-species/${nameOrId}`
      )
      .pipe(map((res) => res.data));

    return forkJoin([baseData$, speciesData$]).pipe(
      map(([baseData, speciesData]) => {
        const englishDescriptionRaw =
          speciesData.flavor_text_entries.find((e) => e.language.name === "en")
            ?.flavor_text ?? "No description available.";

        const englishDescription = englishDescriptionRaw
          .replace(/[\n\f]/g, " ")
          .replace(/\s+/g, " ")
          .trim();

        const habitat = speciesData.habitat?.name ?? "unknown";

        const pokemon: IPokemonProps = {
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
        };

        return pokemon;
      }),
      catchError((error) => {
        return throwError(() => new Error("Error fetching Pokemon:" + error));
      })
    );
  }

  getAllPokemons({
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  }): Observable<IFetchAllPokemonsDataResponse> {
    const params = new URLSearchParams();
    params.append("offset", offset.toString());
    params.append("limit", limit.toString());

    return this.httpService
      .get<IFetchAllPokemonsDataResponse>(
        `${this.baseUrl}/pokemon?${params.toString()}`
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          return throwError(
            () => new Error("Error fetching pokemon list: " + error)
          );
        })
      );
  }

  getPokemonsByType(typeName: TPokemonType): Observable<IFetchPokemonsByType> {
    return this.httpService
      .get<{
        pokemon: { pokemon: { name: string; url: string }; slot: number }[];
      }>(`${this.baseUrl}/type/${typeName}`)
      .pipe(
        map((res) => {
          return {
            pokemons: res.data.pokemon.map((p) => ({
              name: p.pokemon.name,
              id: extractIdFromPokeApiUrl(p.pokemon.url),
              url: p.pokemon.url,
            })),
          };
        }),
        catchError((error) => {
          return throwError(
            () => new Error("Error fetching pokemons by type: " + error)
          );
        })
      );
  }
}
