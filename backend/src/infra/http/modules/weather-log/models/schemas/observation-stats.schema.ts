import z from "zod";

export const observationStatsSchema = z
  .object({
    timestamp: z.coerce.date(),
    temperature: z.coerce.number(),
    isDay: z.boolean(),
    uvIndex: z.coerce.number(),
    relativeHumidity: z.coerce.number().min(0).max(100),
    apparentTemperature: z.coerce.number(),
    precipitationProbability: z.coerce.number().min(0).max(100),
    precipitation: z.coerce.number().min(0),
    rain: z.coerce.number().min(0),
    cloudCover: z.coerce.number().min(0).max(100),
    visibility: z.coerce.number().min(0),
    windSpeed: z.coerce.number().min(0),
    soilTemperature: z.coerce.number(),
    soilMoisture: z.coerce.number().min(0).max(100),
  })
  .strict();

export type TObservationStats = z.infer<typeof observationStatsSchema>;
