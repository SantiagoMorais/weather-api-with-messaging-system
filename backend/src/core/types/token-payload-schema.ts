import { z } from "zod";

export const tokenPayloadSchema = z.object({
  sub: z.uuid(),
});

export type TUserPayload = z.infer<typeof tokenPayloadSchema>;
