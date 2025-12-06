import { locationSchema } from "src/infra/http/modules/weather-log/models/schemas/location.schema";
import { observationStatsSchema } from "src/infra/http/modules/weather-log/models/schemas/observation-stats.schema";
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
