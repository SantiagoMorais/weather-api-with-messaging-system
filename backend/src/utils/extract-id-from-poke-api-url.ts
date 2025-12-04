export const extractIdFromPokeApiUrl = (url: string): number | null => {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? Number(match[1]) : null;
};
