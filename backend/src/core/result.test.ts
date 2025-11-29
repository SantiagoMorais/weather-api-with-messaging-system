import { Failure, failure, Result, Success, success } from "./result";

const doSomething = (shouldSuccess: boolean): Result<string, number> => {
  if (shouldSuccess) return success(1);
  return failure("error");
};

describe("Result", () => {
  it("Success result'", () => {
    const result = doSomething(true);

    expect(result).toBeInstanceOf(Success);
    expect(result.isSuccess()).toEqual(true);
    expect(result.isFailure()).toEqual(false);
  });

  it("Failure result", () => {
    const result = doSomething(false);

    expect(result).toBeInstanceOf(Failure);
    expect(result.isSuccess()).toEqual(false);
    expect(result.isFailure()).toEqual(true);
  });
});
