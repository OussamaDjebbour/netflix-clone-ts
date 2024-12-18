import { filterResults } from '../helpers/filterResults';
import { SearchResult } from '../types/tmdb';
import { fetchTMDBResults } from './fetchTMDBResults';

export const searchMoviesAndTv = async (
  query: string,
): Promise<SearchResult[]> => {
  if (!query.trim()) return []; // Prevent empty queries

  try {
    let currentPage = 1; // Start with the first page
    let totalPages = 5;
    let filteredResults: SearchResult[] = [];

    while (currentPage <= totalPages && filteredResults.length === 0) {
      // Fetch a specific page
      const data = await fetchTMDBResults(query, currentPage);

      // Filter results by media type and genres
      const pageFilteredResults = filterResults(data.results);

      // Add the filtered results from the current page
      filteredResults = filteredResults.concat(pageFilteredResults);

      currentPage++; // Move to the next page
    }

    // Sort all filtered results by vote_average (rating) in descending order
    const sortedResults = filteredResults.sort(
      (a: any, b: any) => b.vote_average - a.vote_average,
    );

    return sortedResults;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
};
