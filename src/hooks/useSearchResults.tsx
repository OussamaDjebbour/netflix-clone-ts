// import { useInfiniteQuery } from '@tanstack/react-query';
// import fetchFilteredResults from '../pages/fetchFilteredResults ';
// // import { fetchFilteredResults } from '../pages/fetchFilteredResults ';

// interface UseSearchResultsProps {
//   query: string;
// }

// export function useSearchResults({ query }: UseSearchResultsProps) {
//   // console.log('query', query);
//   return useInfiniteQuery({
//     queryKey: ['searchResults', query] as const,
//     queryFn: ({ pageParam = 1 }) => fetchFilteredResults({ query, pageParam }),
//     getNextPageParam: (lastPage) => lastPage.nextPage,
//     // getNextPageParam: (lastPage) => {
//     //   if (lastPage.nextPage < lastPage.total_pages) {
//     //     return lastPage.nextPage + 1; // Correctly compute the next page
//     //   }
//     //   return null; // No more pages
//     // },
//     initialPageParam: 1,
//   });
// }

import { useInfiniteQuery } from '@tanstack/react-query';
import { searchMoviesAndShows } from '../kkk/searchService';
import { useCallback } from 'react';

interface UseSearchResultsProps {
  query: string;
}

export function useSearchResults({ query }: UseSearchResultsProps) {
  return useInfiniteQuery({
    queryKey: ['searchResults', query],
    queryFn: ({ pageParam = 1 }) => searchMoviesAndShows(query, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    // staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });
}

// import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
// import { useCallback } from 'react';
// import { searchMoviesAndShows } from '../kkk/searchService';

// interface UseSearchResultsProps {
//   query: string;
// }

// export function useSearchResults({ query }: UseSearchResultsProps) {
//   const queryClient = useQueryClient();

//   // Memoize the queryFn to prevent unnecessary re-renders
//   const queryFn = useCallback(
//     ({ pageParam = 1 }) => searchMoviesAndShows(query, pageParam),
//     [query],
//   );

//   const result = useInfiniteQuery({
//     queryKey: ['searchResults', query],
//     queryFn,
//     getNextPageParam: (lastPage) => lastPage.nextPage,
//     initialPageParam: 1,
//     staleTime: 5 * 60 * 1000, // Cache for 5 minutes
//     refetchOnWindowFocus: false,
//   });

//   // Prefetch next page
//   const prefetchNextPage = useCallback(() => {
//     if (result.hasNextPage && !result.isFetchingNextPage) {
//       const nextPage =
//         result.data?.pages[result.data.pages.length - 1].nextPage;
//       if (nextPage) {
//         queryClient.prefetchQuery({
//           queryKey: ['searchResults', query, nextPage],
//           queryFn: () => searchMoviesAndShows(query, nextPage),
//         });
//       }
//     }
//   }, [
//     query,
//     queryClient,
//     result.data?.pages,
//     result.hasNextPage,
//     result.isFetchingNextPage,
//   ]);

//   return { ...result, prefetchNextPage };
// }
