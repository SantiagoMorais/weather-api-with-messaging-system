import type { TPokemonType } from "@/core/api/responses/pokemon-types";

const colors: Record<TPokemonType, string> = {
  bug: "green-500",
  dark: "gray-700",
  dragon: "blue-700",
  electric: "yellow-600",
  fairy: "pink-300",
  fighting: "rose-600",
  fire: "orange-500",
  flying: "blue-300",
  ghost: "indigo-600",
  grass: "green-500",
  ground: "amber-400",
  ice: "cyan-300",
  normal: "gray-400",
  poison: "purple-500",
  psychic: "red-400",
  rock: "stone-300",
  steel: "blue-gray-500",
  water: "blue-500",
};

export const pokemonsTypesData = Object.entries(colors).map(
  ([type, color]) => ({
    type: type as TPokemonType,
    color: `border shadow-none hover:shadow-lg duration-300 hover:shadow-${color} border-${color} bg-linear-to-b from-background to-${color}`,
  })
);

export const pokemonsIconTypesDataObject: Record<TPokemonType, string> =
  Object.entries(colors).reduce(
    (acc, [type, color]) => {
      acc[type as TPokemonType] = `bg-${color}`;
      return acc;
    },
    {} as Record<TPokemonType, string>
  );

export const pokemonsTypesDataObject: Record<string, string> =
  pokemonsTypesData.reduce(
    (acc, curr) => {
      acc[curr.type] = curr.color;
      return acc;
    },
    {} as Record<string, string>
  );
