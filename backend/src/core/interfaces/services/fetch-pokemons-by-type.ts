export interface IFetchPokemonsByType {
  pokemons: {
    name: string;
    id: string | null;
    url: string;
  }[];
}
