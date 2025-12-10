import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { IFetchAllPokemonsDataResponse } from "@/core/api/responses/fetch-all-pokemons-response";
import { cn } from "@/lib/utils";
import {
  pokemonsIconTypesDataObject,
  pokemonsTypesDataObject,
} from "@/utils/arrays/pokemons-types-data";
import { FaPlus } from "react-icons/fa";

export const PokemonsList = ({
  data: { pokemons },
}: {
  data: IFetchAllPokemonsDataResponse;
}) => {
  const defaultUrl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1026px-Pok%C3%A9_Ball_icon.svg.png";
  return (
    <ul className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 lg:grid-cols-4">
      {pokemons.results.map((pokemon) => (
        <li key={pokemon.id}>
          <Card
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center duration-300 hover:scale-102 hover:opacity-80",
              pokemonsTypesDataObject[pokemon.types[0]]
            )}
          >
            <CardHeader className="justify-center text-center">
              <img
                src={pokemon.image ?? defaultUrl}
                alt={`Imagem do pokemon ${pokemon.name}`}
                className="w-28 min-w-28"
              />
            </CardHeader>
            <CardTitle className="text-lg capitalize">
              {pokemon.name}{" "}
              <span className="text-muted-foreground">#{pokemon.id}</span>
            </CardTitle>
            <ul className="flex justify-center gap-2">
              {pokemon.types.map((type) => (
                <li
                  key={`pokemon-${pokemon.name}-type-${type}`}
                  className={cn(
                    "border-foreground py- rounded-lg border px-2 capitalize",
                    pokemonsIconTypesDataObject[type]
                  )}
                >
                  {type}
                </li>
              ))}
            </ul>
            <CardDescription className="text-foreground">
              <p className="inline-flex w-full justify-between font-bold">
                Height: <span>{pokemon.height / 10}m</span>
              </p>
              <p className="inline-flex w-full justify-between font-bold">
                Weight: <span>{pokemon.weight / 10}kg</span>
              </p>
            </CardDescription>
            <CardFooter>
              <Button
                variant="secondary"
                className="border-foreground text-foreground border opacity-70 hover:opacity-100"
              >
                <FaPlus />
                Click to details
              </Button>
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  );
};
