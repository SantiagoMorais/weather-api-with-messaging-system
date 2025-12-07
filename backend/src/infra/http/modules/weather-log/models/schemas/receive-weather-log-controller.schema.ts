import z from "zod";
import { observationStatsSchema } from "./observation-stats.schema";
import { locationSchema } from "./location.schema";

export const weatherLogPropsSchema = z
  .object({
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional().nullable(),
    hourlyObservationStats: observationStatsSchema,
    currentForecastStats: z
      .array(observationStatsSchema)
      .min(1, "Forecast stats array cannot be empty"),
    location: locationSchema,
    insight: z.string().nullable().optional(),
  })
  .strict();

export const weatherLogPropsSchemaResponse = z.intersection(
  z.object({ id: z.string() }),
  weatherLogPropsSchema
);

export type TWeatherLogControllerRequest = z.infer<
  typeof weatherLogPropsSchema
>;

export type TWeatherLogControllerResponse = z.infer<
  typeof weatherLogPropsSchemaResponse
>;
