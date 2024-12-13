import { SearchResult } from '../types/tmdb';

export const fetchFilteredResults = async ({
  queryKey,
  pageParam = 1,
}: {
  queryKey: [string, string];
  pageParam?: number;
}): Promise<{ results: SearchResult[]; nextPage: number | null }> => {
  const [query, mediaType] = queryKey;
  const API_KEY = import.meta.env.VITE_API_KEY;

  if (!query.trim()) return { results: [], nextPage: null };

  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&include_adult=false&language=en-US&page=${pageParam}`,
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  // Filter results
  const filteredResults = data.results.filter((item: any) => {
    if (item.media_type === 'movie' || item.media_type === 'tv') {
      const genres = item.genre_ids || [];
      const includeGenres = [10751]; // Family and Animation
      const excludeGenres = [10749, 35]; // Romance and Comedy

      return (
        genres.some((genre: number) => includeGenres.includes(genre)) &&
        !genres.some((genre: number) => excludeGenres.includes(genre))
      );
    }
    return false;
  });

  console.log('filteredResults', filteredResults);
  console.log('pageParam', pageParam);
  console.log('data.total_pages', data.total_pages);

  // queryFn: async ({ pageParam = currentPage }) => {
  //   // Simulated API call - replace with your actual API call
  //   const response = await fetch(
  //     `https://api.example.com/data?page=${pageParam}`,
  //   );
  //   const data = await response.json();
  //   return {
  //     results: data.results,
  //     nextPage: data.hasMore ? pageParam + 1 : undefined,
  //   };
  // },

  return {
    results: filteredResults,
    // results: data.results,
    nextPage: pageParam < data.total_pages ? pageParam + 1 : null,
  };
};
