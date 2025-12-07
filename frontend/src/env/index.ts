import { passwordValidationSchema } from "@/core/schemas/password-validation-schema";
import z from "zod";

export const envSchema = z.object({
  VITE_SEED_USER_EMAIL: z
    .string()
    .email("Invalid email format")
    .min(1, "SEED_USER_EMAIL is requited"),
  VITE_SEED_USER_PASS: passwordValidationSchema,
  VITE_NEST_API_URL: z.string().url("Invalid URL format"),

  VITE_OPENMETEO_LAT: z.coerce.number().default(-19.919064259576032),
  VITE_OPENMETEO_LON: z.coerce.number().default(-43.938693476692116),
});

const _env = envSchema.safeParse(import.meta.env);

if (_env.error) throw new Error("Invalid environment variables");

export const env = _env.data;
