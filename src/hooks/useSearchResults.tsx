import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFilteredResults } from '../pages/fetchFilteredResults ';
// import { fetchFilteredResults } from '../types/tmdb';
// import { fetchFilteredResults } from '../api/fetchFilteredResults';

interface UseSearchResultsProps {
  query: string;
  mediaType: string;
}

export function useSearchResults({ query, mediaType }: UseSearchResultsProps) {
  return useInfiniteQuery({
    queryKey: [query, mediaType] as const,
    // queryKey: [query] as const,
    queryFn: ({ pageParam = 1 }) =>
      // fetchFilteredResults({ queryKey: [query, mediaType], pageParam }),
      fetchFilteredResults({ queryKey: [query, mediaType], pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
}
