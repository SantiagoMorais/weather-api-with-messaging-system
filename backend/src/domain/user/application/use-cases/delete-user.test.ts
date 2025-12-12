import { FakeHasher } from "test/cryptography/fake-hasher";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { CreateUserUseCase } from "./create-user.usecase";
import { PasswordMismatchError } from "src/core/errors/password-mismatch-error";
import { UserAlreadyExistsError } from "src/core/errors/user-already-exists-error";
import { DeleteUserUseCase } from "./delete-user-usecase";
import { makeUser } from "test/factories/make-user";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: DeleteUserUseCase;

describe("DeleteUserUseCase", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new DeleteUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to delete an user", async () => {
    const fakeUser = makeUser();
    await inMemoryUsersRepository.create(fakeUser);

    expect(inMemoryUsersRepository.users).toHaveLength(1);

    const result = await sut.execute({ user: fakeUser });

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryUsersRepository.users).toHaveLength(0);
  });
});
