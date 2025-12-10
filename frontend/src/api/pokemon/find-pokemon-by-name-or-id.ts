import type { IGetPokemonDetails } from "@/core/api/responses/find-pokemon-details";
import { env } from "@/env";
import axios from "axios";

export const findPokemonByNameOrId = async ({
  nameOrId,
}: {
  nameOrId: string | number;
}): Promise<IGetPokemonDetails> => {
  const token = localStorage.getItem("gdash-token");
  const baseUrl = env.VITE_NEST_API_URL;
  const url = `${baseUrl}/pokemons/${nameOrId}`;

  const { data } = await axios.get<IGetPokemonDetails>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
