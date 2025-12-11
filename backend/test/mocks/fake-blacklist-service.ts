import { Blacklist } from "src/domain/user/authentication/blacklist";

export class FakeBlacklistService implements Blacklist {
  public blacklistedTokens = new Set<string>();

  async blacklistToken(token: string, ttl: number): Promise<void> {
    this.blacklistedTokens.add(token);
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    return this.blacklistedTokens.has(token);
  }
}
