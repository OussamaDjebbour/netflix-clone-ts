// import { QueryClient } from '@tanstack/react-query';
// import { SearchResult } from '../types/tmdb';
// import { useMemo } from 'react';

// const queryClient = new QueryClient();

// const fetchFilteredResults = async ({
//   // queryKey,
//   query,
//   pageParam = 1,
// }: {
//   query: string;
//   // queryKey: [string];
//   pageParam?: number;
//   // pageParam?: number | undefined | null;
// }): Promise<{ results: SearchResult[]; nextPage: number | null }> => {
//   // const [query] = queryKey;
//   // console.log('queryKey', queryKey);
//   const API_KEY = import.meta.env.VITE_API_KEY;

//   if (!query.trim()) return { results: [], nextPage: null };

//   const response = await fetch(
//     `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&include_adult=false&language=en-US&page=${pageParam}`,
//   );

//   if (!response.ok) {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }

//   const data = await response.json();

//   // Filter results
//   const filteredResults = data.results.filter((item: any) => {
//     if (item.media_type === 'movie' || item.media_type === 'tv') {
//       const genres = item.genre_ids || [];
//       const includeGenres = [10751]; // Family and Animation
//       const excludeGenres = [10749, 35]; // Romance and Comedy

//       return (
//         genres.some((genre: number) => includeGenres.includes(genre)) &&
//         !genres.some((genre: number) => excludeGenres.includes(genre))
//       );
//     }
//     return false;
//   });

//   console.log('filteredResults', filteredResults);
//   console.log('pageParam', pageParam);
//   console.log('data.total_pages', data.total_pages);
//   // console.log();

//   // queryFn: async ({ pageParam = currentPage }) => {
//   //   // Simulated API call - replace with your actual API call
//   //   const response = await fetch(
//   //     `https://api.example.com/data?page=${pageParam}`,
//   //   );
//   //   const data = await response.json();
//   //   return {
//   //     results: data.results,
//   //     nextPage: data.hasMore ? pageParam + 1 : undefined,
//   //   };
//   // },

//   // If the current page has no valid data, prefetch the next page
//   // if (filteredResults?.length === 0 && filteredResults.nextPage) {
//   //   queryClient.prefetchQuery({
//   //     queryKey: ['searchResults', query, filteredResults.nextPage],
//   //     queryFn: () =>
//   //       fetch(
//   //         `https://api.example.com/results?query=${query}&page=${filteredResults.nextPage}`,
//   //       ).then((res) => res.json()),
//   //   });
//   // }

//   // Memoize the object to avoid creating a new reference on each render
//   // const memoizedObject = useMemo(() => {
//   //   return {
//   //     results: filteredResults,
//   //     // results: data.results,
//   //     nextPage: pageParam < data.total_pages ? pageParam + 1 : null,
//   //   };
//   // }, [filteredResults, pageParam]);

//   // return memoizedObject;

//   // Memoize the results
//   // const memoizedResults = useMemo(() => filteredResults, [filteredResults]);

//   // return {
//   //   results: memoizedResults,
//   //   nextPage: pageParam < data.total_pages ? pageParam + 1 : null,
//   // };
//   return {
//     results: filteredResults,
//     // results: data.results,
//     nextPage: pageParam < data.total_pages ? pageParam + 1 : null,
//   };
//   // return filteredResults;
// };

// export default fetchFilteredResults;

import { SearchResult } from '../types/tmdb';

interface FilteredResultsResponse {
  results: SearchResult[];
  nextPage: number | null;
  hasNextPage: boolean;
}

const fetchFilteredResults = async ({
  query,
  pageParam = 1,
}: {
  query: string;
  pageParam?: number;
}): Promise<FilteredResultsResponse> => {
  const API_KEY = import.meta.env.VITE_API_KEY;

  if (!query.trim()) {
    return {
      results: [],
      nextPage: null,
      hasNextPage: false,
    };
  }

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

  // Only return next page if we have results and haven't reached the total pages
  const hasNextPage =
    pageParam < data.total_pages && filteredResults.length > 0;

  return {
    results: filteredResults,
    nextPage: hasNextPage ? pageParam + 1 : null,
    hasNextPage,
  };
};

export default fetchFilteredResults;
