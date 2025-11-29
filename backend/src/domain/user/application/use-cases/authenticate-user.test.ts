import { FakeCryptographer } from "test/cryptography/fake-cryptographer";
import { FakeHasher } from "test/cryptography/fake-hasher";
import { makeUser } from "test/factories/make-user";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { AuthenticateUser } from "./authenticate-user";
import { WrongCredentialsError } from "src/core/errors/wrong-credentials-error";

let inMemoryUsersRepository: InMemoryUsersRepository;
let fakeHasher: FakeHasher;
let fakeCryptographer: FakeCryptographer;
let sut: AuthenticateUser;

describe("AuthenticateUser use case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    fakeHasher = new FakeHasher();
    fakeCryptographer = new FakeCryptographer();
    sut = new AuthenticateUser(
      inMemoryUsersRepository,
      fakeHasher,
      fakeCryptographer
    );
  });

  it("should be able to authenticate an user", async () => {
    const userCreated = makeUser({
      email: "felipe@test.com",
      password: await fakeHasher.hash("1234"),
    });

    await inMemoryUsersRepository.create(userCreated);

    const result = await sut.execute({
      email: "felipe@test.com",
      password: "1234",
    });

    expect(result.isSuccess()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });

  it("should not be able to authenticate an user with wrong credentials", async () => {
    const userCreated = makeUser({
      email: "felipe@test.com",
      password: await fakeHasher.hash("1234"),
    });

    await inMemoryUsersRepository.create(userCreated);

    const resultWithWrongEmail = await sut.execute({
      email: "wrong-email@test.com",
      password: "1234",
    });

    const resultWithWrongPassword = await sut.execute({
      email: "felipe@test.com",
      password: "5678",
    });

    expect(resultWithWrongEmail.isFailure()).toBe(true);
    expect(resultWithWrongEmail.value).toBeInstanceOf(WrongCredentialsError);

    expect(resultWithWrongPassword.isFailure()).toBe(true);
    expect(resultWithWrongPassword.value).toBeInstanceOf(WrongCredentialsError);
  });
});
