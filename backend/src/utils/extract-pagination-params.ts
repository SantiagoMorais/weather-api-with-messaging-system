export const extractPaginationParams = (
  url: string | null
): { limit: number | null; offset: number | null } | null => {
  if (!url) return null;
  try {
    const urlObj = new URL(url);
    const limit = urlObj.searchParams.get("limit");
    const offset = urlObj.searchParams.get("offset");
    return {
      limit: limit ? parseInt(limit, 10) : null,
      offset: offset ? parseInt(offset, 10) : null,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
