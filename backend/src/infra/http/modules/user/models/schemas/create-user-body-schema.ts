import { z } from "zod";

export const passwordValidation = z
  .string()
  .min(8, { message: "A senha deve ter no mínimo 8 caracteres." })
  .regex(/[A-Z]/, {
    message: "A senha deve conter pelo menos uma letra maiúscula.",
  })
  .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número." })
  .regex(/[^a-zA-Z0-9\s]/, {
    message:
      "A senha deve conter pelo menos um caractere especial (ex: !@#$%).",
  });

export const createUserBodySchema = z
  .object({
    name: z.coerce.string(),
    email: z.email(),
    password: passwordValidation,
    repeatPassword: passwordValidation,
  })
  .refine((data) => data.password === data.repeatPassword, {
    error: "The passwords don't match.",
    path: ["repeatPassword"],
  })
  .strict();

export type TCreateUserControllerRequest = z.infer<typeof createUserBodySchema>;
