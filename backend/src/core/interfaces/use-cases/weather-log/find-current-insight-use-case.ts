import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { Result } from "src/core/result";

export type FindCurrentInsightUseCaseResponse = Result<
  DataNotFoundError,
  {
    insight: string;
  }
>;
