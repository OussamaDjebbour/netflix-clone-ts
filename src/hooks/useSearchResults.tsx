import { useInfiniteQuery } from '@tanstack/react-query';
import { searchAllMoviesAndShows } from '../services/searchAllMoviesAndShows';

interface UseSearchResultsProps {
  query: string;
}

export function useSearchResults({ query }: UseSearchResultsProps) {
  return useInfiniteQuery({
    queryKey: ['searchResults', query],
    queryFn: ({ pageParam = 1 }) => searchAllMoviesAndShows(query, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    refetchOnWindowFocus: false,
  });
}
