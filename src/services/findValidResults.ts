import { SearchResult, TMDBResponse } from '../types/tmdb';
import { fetchTMDBResults } from './fetchTMDBResults';
import { filterResults } from '../helpers/filterResults';

const defaultResponse: TMDBResponse = {
  results: [],
  page: 0,
  total_pages: 0,
};

export async function findValidResults(
  query: string,
  startPage: number,
  maxAttempts = 5,
): Promise<{ results: SearchResult[]; lastPage: number; totalPages: number }> {
  let currentPage = startPage;
  let attempts = 0;
  let lastResponse: TMDBResponse = defaultResponse;

  while (attempts < maxAttempts) {
    lastResponse = await fetchTMDBResults(query, currentPage);
    const filteredResults = filterResults(lastResponse.results);

    if (filteredResults.length > 0) {
      return {
        results: filteredResults,
        lastPage: currentPage,
        totalPages: lastResponse.total_pages,
      };
    }

    if (currentPage >= lastResponse.total_pages) {
      break;
    }

    currentPage++;
    attempts++;
  }

  return {
    results: [],
    lastPage: currentPage,
    totalPages: lastResponse.total_pages,
  };
}
