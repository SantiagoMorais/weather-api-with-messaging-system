import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { FindUserByIdUseCase } from "./find-user-by-id.usecase";
import { makeUser } from "test/factories/make-user";
import { DataNotFoundError } from "src/core/errors/data-not-found-error";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: FindUserByIdUseCase;

describe("FindUserById use case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new FindUserByIdUseCase(inMemoryUsersRepository);
  });

  it("should be able to find user by id", async () => {
    const id = new UniqueEntityId("id-example");
    const user = makeUser({}, id);
    inMemoryUsersRepository.users.push(user);

    const result = await sut.execute({ id });

    expect(result.isSuccess()).toBe(true);
  });

  it("should not receive a user form a invalid id", async () => {
    const existedId = new UniqueEntityId("id-that-exists");
    const nonExistedId = new UniqueEntityId("id-that-not-exists");
    const user = makeUser({}, existedId);
    inMemoryUsersRepository.users.push(user);

    const result = await sut.execute({ id: nonExistedId });

    expect(result.isFailure()).toBe(true);
    expect(result.value).toBeInstanceOf(DataNotFoundError);
  });
});
