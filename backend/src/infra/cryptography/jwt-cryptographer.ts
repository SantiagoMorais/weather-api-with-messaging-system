import { Injectable } from "@nestjs/common";
import { Cryptographer } from "src/domain/user/cryptography/cryptographer";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtCryptographer implements Cryptographer {
  constructor(private jwtService: JwtService) {}

  encrypt(payload: Record<string, unknown>): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
