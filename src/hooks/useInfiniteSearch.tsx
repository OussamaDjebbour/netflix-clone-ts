import { useInfiniteQuery } from '@tanstack/react-query';
// import { fetchFilteredResults } from '../api/tmdb';
import { fetchFilteredResults, type SearchResult } from '../types/tmdb';
import { PAGINATION_CONFIG } from '../constants';

interface UseInfiniteSearchOptions {
  query: string;
  mediaType: string;
  enabled?: boolean;
}

interface SearchResponse {
  results: SearchResult[];
  nextPage: number | null;
  totalPages: number;
}

export function useInfiniteSearch({
  query,
  mediaType,
  enabled = true,
}: UseInfiniteSearchOptions) {
  return useInfiniteQuery<SearchResponse>({
    queryKey: ['search', query, mediaType],
    queryFn: ({ pageParam = PAGINATION_CONFIG.INITIAL_PAGE }) =>
      fetchFilteredResults({ query, mediaType, pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: PAGINATION_CONFIG.INITIAL_PAGE,
    enabled: enabled && Boolean(query.trim()),
  });
}
