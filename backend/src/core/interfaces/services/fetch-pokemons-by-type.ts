export interface IFetchPokemonsByType {
  pokemons: {
    name: string;
    id: number | null;
    url: string;
  }[];
}
