/* eslint-disable @typescript-eslint/require-await */
import { Cryptographer } from "src/domain/user/cryptography/cryptographer";

export class FakeCryptographer implements Cryptographer {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload);
  }
}
