import z from "zod";

export const locationSchema = z
  .object({
    longitude: z.coerce
      .number()
      .min(-180, "Longitude must be between -180 and 180")
      .max(180, "Longitude must be between -180 and 180"),
    latitude: z.coerce
      .number()
      .min(-90, "Latitude must be between -90 and 90")
      .max(90, "Latitude must be between -90 and 90"),
    timezone: z.string().min(1, "Timezone is required"),
  })
  .strict();

export type TLocation = z.infer<typeof locationSchema>;
