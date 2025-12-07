import { passwordValidationSchema } from "@/core/schemas/password-schema";
import z from "zod";

export const envSchema = z.object({
  SEED_USER_EMAIL: z
    .email("Invalid email format")
    .min(1, "SEED_USER_EMAIL is requited"),
  SEED_USER_PASS: passwordValidationSchema,
});

const _env = envSchema.safeParse(import.meta.env);

if (_env.error) throw new Error("Invalid environment variables");

export const env = _env.data;
