import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { Result } from "src/core/result";

export type TLogoutUserUseCaseResponse = Result<DataNotFoundError, void>;
