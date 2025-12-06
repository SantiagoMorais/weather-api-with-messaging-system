import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { Result } from "src/core/result";

export type TFindCurrentInsightUseCaseResponse = Result<
  DataNotFoundError,
  {
    insight?: string | null;
    _id: string;
  }
>;
