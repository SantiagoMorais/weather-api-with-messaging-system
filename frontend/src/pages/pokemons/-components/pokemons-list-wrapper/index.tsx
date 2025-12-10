import { findManyPokemons } from "@/api/pokemon/find-many-pokemons";
import { useQuery } from "@tanstack/react-query";
import { PokemonsList } from "./pokemons-list";

export const PokemonsListWrapper = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["/pokemons"],
    queryFn: async () => await findManyPokemons({ limit: 20, offset: 0 }),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const content = () => {
    if (isPending) return "pending";
    if (error) return "error";
    return <PokemonsList data={data} />;
  };

  return <section>{content()}</section>;
};
