import z from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.url(),
  PORT: z.coerce.number().optional().default(3333),
  JWT_PRIVATE_KEY: z.coerce.string(),
  JWT_PUBLIC_KEY: z.coerce.string(),
  GEMINI_API_KEY: z.coerce.string(),
});

export type Env = z.infer<typeof envSchema>;
