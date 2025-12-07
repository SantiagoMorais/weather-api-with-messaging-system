export interface IGetPokemonSpeciesDataResponse {
  habitat?: { name: string };
  flavor_text_entries: {
    language: { name: string };
    flavor_text: string;
  }[];
}
