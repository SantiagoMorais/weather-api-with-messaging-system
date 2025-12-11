import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import {
  tokenPayloadSchema,
  TUserPayload,
} from "src/core/types/utility-types/token-payload-schema";
import { EnvService } from "../../env/env.service";
import { Blacklist } from "src/domain/user/authentication/blacklist";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: EnvService,
    private blacklist: Blacklist
  ) {
    const publicKey = config.get("JWT_PUBLIC_KEY");
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, "base64"),
      algorithms: ["RS256"],

      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: TUserPayload) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    if (!token) {
      throw new UnauthorizedException("Missing token");
    }

    const isBlacklisted = await this.blacklist.isTokenBlacklisted(token);

    if (isBlacklisted) {
      throw new UnauthorizedException("Token blacklisted");
    }

    return tokenPayloadSchema.parse(payload);
  }
}
