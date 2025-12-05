import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { Result } from "src/core/result";
import { ILocation } from "../../location";

export type FindLocationUseCaseResponse = Result<
  DataNotFoundError,
  {
    location: ILocation;
  }
>;
