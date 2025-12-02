import { Module } from "@nestjs/common";
import { JwtCryptographer } from "./jwt-cryptographer";
import { BcryptHasher } from "./bcrypt-hasher";
import { Cryptographer } from "src/domain/user/cryptography/cryptographer";
import { HashGenerator } from "src/domain/user/cryptography/hash-generator";
import { HashComparer } from "src/domain/user/cryptography/hash-comparer";

@Module({
  providers: [
    {
      provide: Cryptographer,
      useClass: JwtCryptographer,
    },
    {
      provide: HashGenerator,
      useClass: BcryptHasher,
    },
    {
      provide: HashComparer,
      useClass: BcryptHasher,
    },
  ],
  exports: [Cryptographer, HashComparer, HashGenerator],
})
export class CryptographyModule {}
