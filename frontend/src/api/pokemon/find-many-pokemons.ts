import type { IFetchAllPokemonsDataResponse } from "@/core/api/responses/fetch-all-pokemons-response";
import { env } from "@/env";
import axios from "axios";

export const findManyPokemons = async ({
  limit,
  offset,
}: {
  limit?: number;
  offset?: number;
}): Promise<IFetchAllPokemonsDataResponse> => {
  const token = localStorage.getItem("gdash-token");
  const baseUrl = env.VITE_NEST_API_URL;

  let params = new URLSearchParams();
  if (offset) params.append("offset", offset.toString());
  if (limit) params.append("limit", limit.toString());

  const url = `${baseUrl}/pokemons${params && "?" + params.toString()}`;

  console.log(url);

  const { data } = await axios.get<IFetchAllPokemonsDataResponse>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
