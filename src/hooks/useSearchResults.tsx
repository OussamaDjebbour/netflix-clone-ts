import { useInfiniteQuery } from '@tanstack/react-query';
import { searchMoviesAndShows } from '../services/searchMoviesAndShows';

interface UseSearchResultsProps {
  query: string;
}

export function useSearchResults({ query }: UseSearchResultsProps) {
  return useInfiniteQuery({
    queryKey: ['searchResults', query],
    queryFn: ({ pageParam = 1 }) => searchMoviesAndShows(query, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    refetchOnWindowFocus: false,
  });
}
