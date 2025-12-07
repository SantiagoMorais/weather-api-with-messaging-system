import z from "zod";
import { passwordValidationSchema } from "../../schemas/password-validation-schema";

export const authenticateUserSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "Email field is required"),
  password: passwordValidationSchema,
});

export type TAuthenticateUser = z.infer<typeof authenticateUserSchema>;
