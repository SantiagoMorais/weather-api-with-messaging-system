import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { FindUserByEmailUseCase } from "./find-user-by-email.usecase";
import { makeUser } from "test/factories/make-user";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: FindUserByEmailUseCase;

describe("FindUserByEmail use case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new FindUserByEmailUseCase(inMemoryUsersRepository);
  });

  it("should be able to find user by id", async () => {
    const email = "felipe@mail.com";
    const user = makeUser({ email });
    inMemoryUsersRepository.users.push(user);

    const result = await sut.execute({ email });

    expect(result.isSuccess()).toBe(true);
  });

  it("should not receive a user form a invalid email", async () => {
    const user = makeUser({ email: "felipe@mail.com" });
    inMemoryUsersRepository.users.push(user);

    const result = await sut.execute({ email: "different-email@mail.com" });

    expect(result.isFailure()).toBe(true);
    expect(result.value).toBeInstanceOf(DataNotFoundError);
  });
});
