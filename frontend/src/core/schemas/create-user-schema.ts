import { z } from "zod";
import { passwordValidationSchema } from "./password-validation-schema";

export const createUserSchema = z
  .object({
    name: z.coerce
      .string()
      .min(1, "Name field is required")
      .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+)+$/, {
        message: "Full name must contain at least first and last name",
      }),
    email: z
      .string()
      .email("Invalid email format")
      .min(1, "Email field is required"),
    password: passwordValidationSchema,
    repeatPassword: passwordValidationSchema,
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "The passwords don't match",
    path: ["repeatPassword"],
  });

export type TCreateUser = z.infer<typeof createUserSchema>;
