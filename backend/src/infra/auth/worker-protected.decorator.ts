import { applyDecorators, UseGuards } from "@nestjs/common";
import { WorkerApiKeyGuard } from "./worker-api-key-guard";

export function WorkerProtected() {
  return applyDecorators(UseGuards(WorkerApiKeyGuard));
}
