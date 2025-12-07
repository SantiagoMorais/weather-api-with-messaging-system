import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { Result } from "src/core/result";
import { ILocation } from "../api/location";

export type TFindLocationUseCaseResponse = Result<
  DataNotFoundError,
  {
    location: ILocation;
    id: string; // Entity ID
  }
>;
