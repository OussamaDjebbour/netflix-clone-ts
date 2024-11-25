import { TMDBBASEURL } from '../constants';
import { SearchResponse, SearchResult } from '../types/tmdb';

export const searchMoviesAndTv = async (
  query: string,
  mediaType: 'movie' | 'tv',
): Promise<SearchResult[]> => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&include_adult=false&language=en-US`,
    );
    // const response = await fetch(
    //   `${TMDBBASEURL}}/search/${mediaType}?api_key=${API_KEY}&query=${query}`,
    // );
    // const response = await fetch(
    //   `${TMDBBASEURL}}/search/${mediaType}?api_key=${API_KEY}&query=${encodeURIComponent(
    //     query,
    //   )}`,
    // );

    console.log('response', response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: SearchResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
};
