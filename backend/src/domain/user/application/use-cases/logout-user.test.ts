import { FakeBlacklistService } from "test/mocks/fake-blacklist-service";
import { LogoutUserUseCase } from "./logout-user.usecase";

let fakeBlacklistService: FakeBlacklistService;
let sut: LogoutUserUseCase;

describe("LogoutUser use case", () => {
  beforeEach(() => {
    fakeBlacklistService = new FakeBlacklistService();
    sut = new LogoutUserUseCase(fakeBlacklistService);
  });

  it("should be able to add a token into blacklist", async () => {
    const token = "fake-jwt-token";
    const ttl = 3600;

    const result = await sut.execute(token, ttl);

    expect(result.isSuccess()).toBeTruthy();
    expect(fakeBlacklistService.blacklistedTokens).toHaveLength(1);
    expect(fakeBlacklistService.isTokenBlacklisted(token)).toBeTruthy();
  });
});
