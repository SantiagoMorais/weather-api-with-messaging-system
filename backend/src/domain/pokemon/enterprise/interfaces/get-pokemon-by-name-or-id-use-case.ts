import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { Result } from "src/core/result";
import { IPokemonProps } from "../../../../core/interfaces/entities/pokemon-props";

export interface IGetPokemonByNameOrIdUseCaseRequest {
  nameOrId: string | number;
}

export type TGetPokemonByNameOrIdUseCaseResponse = Result<
  DataNotFoundError,
  { pokemon: IPokemonProps }
>;
