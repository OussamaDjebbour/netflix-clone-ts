import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFilteredResults } from '../pages/fetchFilteredResults ';
// import { fetchFilteredResults } from '../types/tmdb';
// import { fetchFilteredResults } from '../api/fetchFilteredResults';

interface UseSearchResultsProps {
  query: string;
}

export function useSearchResults({ query }: UseSearchResultsProps) {
  return useInfiniteQuery({
    queryKey: ['searchResults', query] as const,
    queryFn: ({ pageParam = 1 }) => fetchFilteredResults({ query, pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
}
