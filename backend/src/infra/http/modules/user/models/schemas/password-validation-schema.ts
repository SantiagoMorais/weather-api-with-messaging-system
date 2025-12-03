import z from "zod";

export const passwordValidationSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long." })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter.",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number." })
  .regex(/[^a-zA-Z0-9\s]/, {
    message:
      "Password must contain at least one special character (e.g., !@#$%).",
  });

export type TPasswordValidation = z.infer<typeof passwordValidationSchema>;
