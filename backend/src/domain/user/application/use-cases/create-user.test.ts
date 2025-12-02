import { FakeHasher } from "test/cryptography/fake-hasher";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { CreateUserUseCase } from "./create-user.usecase";
import { PasswordMismatchError } from "src/core/errors/password-mismatch-error";
import { UserAlreadyExistsError } from "src/core/errors/user-already-exists-error";

let inMemoryUsersRepository: InMemoryUsersRepository;
let fakeHasher: FakeHasher;
let sut: CreateUserUseCase;

describe("CreateUser use case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    fakeHasher = new FakeHasher();
    sut = new CreateUserUseCase(inMemoryUsersRepository, fakeHasher);
  });

  it("should be able to create an user", async () => {
    const result = await sut.execute({
      email: "felipe@test.com",
      name: "Felipe Santiago",
      password: "1234",
      repeatPassword: "1234",
    });

    expect(result.isSuccess()).toBe(true);
    expect(result.value).toEqual({
      user: inMemoryUsersRepository.users[0],
    });
  });

  it("should not be able to create an user when the passwords don't match", async () => {
    const result = await sut.execute({
      email: "felipe@test.com",
      name: "Felipe Santiago",
      password: "first-password",
      repeatPassword: "different-password",
    });

    expect(result.isFailure()).toBe(true);
    expect(result.value).toBeInstanceOf(PasswordMismatchError);
  });

  it("should hash user password upon creation", async () => {
    const result = await sut.execute({
      email: "felipe@test.com",
      name: "Felipe Santiago",
      password: "1234",
      repeatPassword: "1234",
    });

    const hashedPassword = await fakeHasher.hash("1234");

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryUsersRepository.users[0].password).toEqual(hashedPassword);
  });

  it("should not be able to create two users with same email", async () => {
    await sut.execute({
      email: "felipe@test.com",
      name: "Felipe Santiago",
      password: "1234",
      repeatPassword: "1234",
    });

    const result = await sut.execute({
      email: "felipe@test.com",
      name: "Felipe Morais",
      password: "5678",
      repeatPassword: "5678",
    });

    expect(result.isFailure()).toBe(true);
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError);
  });
});
