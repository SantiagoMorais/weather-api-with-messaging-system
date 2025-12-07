import z from "zod";
import { observationStatsSchema } from "./observation-stats.schema";
import { locationSchema } from "./location.schema";

export const weatherLogPropsSchema = z
  .object({
    createdAt: z.coerce.date(),
    hourlyObservationStats: observationStatsSchema,
    currentForecastStats: z
      .array(observationStatsSchema)
      .min(1, "Forecast stats array cannot be empty"),
    location: locationSchema,
  })
  .strict();

export const weatherLogPropsSchemaResponse = z.intersection(
  z.object({
    id: z.string(),
    insight: z.string().nullable().optional(),
    updatedAt: z.coerce.date().optional().nullable(),
  }),
  weatherLogPropsSchema
);

export type TWeatherLogControllerRequest = z.infer<
  typeof weatherLogPropsSchema
>;

export type TWeatherLogControllerResponse = z.infer<
  typeof weatherLogPropsSchemaResponse
>;
