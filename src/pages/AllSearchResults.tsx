import { useInfiniteQuery } from '@tanstack/react-query';
import { searchMoviesAndTv } from '../services/searchMoviesAndTv';

function AllSearchResults() {
  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    ...result
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) => searchMoviesAndTv(pageParam),
    ...options,
    getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
  });
  return <div></div>;
}

export default AllSearchResults;
