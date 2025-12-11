import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import {
  tokenPayloadSchema,
  TUserPayload,
} from "src/core/types/utility-types/token-payload-schema";
import { EnvService } from "../../env/env.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: EnvService) {
    const publicKey = config.get("JWT_PUBLIC_KEY");
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, "base64"),
      algorithms: ["RS256"],
    });
  }

  validate(payload: TUserPayload): unknown {
    return tokenPayloadSchema.parse(payload);
  }
}
