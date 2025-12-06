import { z } from "zod";

export const tokenPayloadSchema = z.object({
  sub: z.string(),
});

export type TUserPayload = z.infer<typeof tokenPayloadSchema>;
