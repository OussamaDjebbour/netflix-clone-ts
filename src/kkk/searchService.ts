import { SearchResult } from '../types/tmdb';

const INCLUDE_GENRES = [10751]; // Family and Animation
const EXCLUDE_GENRES = [10749, 35]; // Romance and Comedy

export function filterResults(results: any[]): SearchResult[] {
  return results.filter((item) => {
    if (item.media_type === 'movie' || item.media_type === 'tv') {
      const genres = item.genre_ids || [];
      return (
        genres.some((genre: number) => INCLUDE_GENRES.includes(genre)) &&
        !genres.some((genre: number) => EXCLUDE_GENRES.includes(genre))
      );
    }
    return false;
  });
}

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchTMDBResults(query: string, page: number) {
  const response = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}&include_adult=false&language=en-US&page=${page}`,
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}

export interface SearchResponse {
  results: SearchResult[];
  nextPage: number | null;
  hasNextPage: boolean;
  currentPage: number;
  totalPages: number;
}

export interface SearchResponse {
  results: SearchResult[];
  nextPage: number | null;
  hasNextPage: boolean;
  currentPage: number;
  totalPages: number;
}

export interface TMDBResponse {
  results: any[];
  page: number;
  total_pages: number;
}

async function findValidResults(
  query: string,
  startPage: number,
  maxAttempts = 5,
): Promise<{ results: SearchResult[]; lastPage: number; totalPages: number }> {
  let currentPage = startPage;
  let attempts = 0;
  let lastResponse: TMDBResponse | null = null;

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
    totalPages: lastResponse?.total_pages || currentPage,
  };
}

export async function searchMoviesAndShows(
  query: string,
  pageParam = 1,
): Promise<SearchResponse> {
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
