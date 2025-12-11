import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { TUserPayload } from "src/core/types/utility-types/token-payload-schema";

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return request.user as TUserPayload;
  }
);
