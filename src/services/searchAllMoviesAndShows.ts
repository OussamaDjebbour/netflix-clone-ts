import { SearchAllResultsResponse } from '../types/tmdb';
import { findValidResults } from './findValidResults';

export async function searchAllMoviesAndShows(
  query: string,
  pageParam = 1,
): Promise<SearchAllResultsResponse> {
  if (!query.trim()) {
    return {
      results: [],
      nextPage: null,
      hasNextPage: false,
      currentPage: pageParam,
      totalPages: 0,
    };
  }

  const { results, lastPage, totalPages } = await findValidResults(
    query,
    pageParam,
  );
  const hasNextPage = lastPage < totalPages;

  return {
    results,
    nextPage: hasNextPage ? lastPage + 1 : null,
    hasNextPage,
    currentPage: lastPage,
    totalPages,
  };
}
