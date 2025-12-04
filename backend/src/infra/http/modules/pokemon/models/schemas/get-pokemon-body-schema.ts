import z from "zod";

export const getPokemonBodySchema = z.object({
  nameOrId: z.union([z.string(), z.number()]),
});

export type TGetPokemonControllerRequest = z.infer<typeof getPokemonBodySchema>;
