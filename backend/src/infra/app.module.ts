import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./env/env";
import { CryptographyModule } from "./cryptography/cryptography.module";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { HttpModule as AppHttpModule } from "./http/http.module";
import { SwaggerService } from "./swagger/swagger.service";

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    CryptographyModule,
    AuthModule,
    DatabaseModule,
    AppHttpModule,
  ],
  providers: [SwaggerService],
})
export class AppModule {}
