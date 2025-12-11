import z from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3333),
  JWT_PRIVATE_KEY: z.coerce.string(),
  JWT_PUBLIC_KEY: z.coerce.string(),
  JWT_EXPIRES_IN: z.coerce.string().default("7d"), // 7 days
  GEMINI_API_KEY: z.coerce.string(),
  MONGO_URI: z.coerce.string(),
  MONGO_TEST_URI: z.coerce
    .string()
    .default("mongodb://127.0.0.1:27017/test-db-dummy"),
  NODE_ENV: z
    .enum(["test", "production", "development"])
    .default("development"),
  WORKER_API_KEY: z.coerce.string(),
  SEED_USER_EMAIL: z.string().default("johndoe@gdash.com"),
  SEED_USER_PASS: z.string().default("Gdash@123"),
  REDIS_URL: z.string(),
});

export type Env = z.infer<typeof envSchema>;
