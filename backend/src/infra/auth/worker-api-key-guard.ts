import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Env } from "../env/env";
import { Request } from "express";

@Injectable()
export class WorkerApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService<Env, true>) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const incomingKey = request.headers["x-worker-key"];

    const expectedKey = this.configService.get("WORKER_API_KEY");

    if (!incomingKey || incomingKey !== expectedKey) {
      throw new UnauthorizedException("Invalid API key");
    }

    return true;
  }
}
