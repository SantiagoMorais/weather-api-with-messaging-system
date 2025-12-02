import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./env/env";
import { CryptographyModule } from "./cryptography/cryptography.module";

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    CryptographyModule,
  ],
})
export class AppModule {}
