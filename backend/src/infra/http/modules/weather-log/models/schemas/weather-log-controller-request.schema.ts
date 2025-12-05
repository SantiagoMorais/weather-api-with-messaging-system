import { locationSchema } from "src/core/types/weather-log/location.schema";
import { observationStatsSchema } from "src/core/types/weather-log/observation-stats.schema";
import z from "zod";

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

export type TWeatherLogControllerRequest = z.infer<
  typeof weatherLogPropsSchema
>;
