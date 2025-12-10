export const pokemonStatsName = [
  "hp",
  "attack",
  "defense",
  "special-attack",
  "special-defense",
  "speed",
] as const;

export type TPokemonStatName = (typeof pokemonStatsName)[number];
