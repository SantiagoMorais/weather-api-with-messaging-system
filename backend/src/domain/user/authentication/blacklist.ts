export abstract class Blacklist {
  /**
   * Add a token into the  blacklist
   * @param token JWT to be validated
   * @param ttl time in seconds to expires
   */
  abstract blacklistToken(token: string, ttl: number): Promise<void>;

  /**
   * Checks if the tokens is in blacklist
   */
  abstract isTokenBlacklisted(token: string): Promise<boolean>;
}
