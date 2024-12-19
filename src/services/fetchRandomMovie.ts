import { TMDBBASEURL } from '../constants';
import { SearchResult } from '../types/tmdb';

export const fetchRandomMovie = async (
  mediaType: string,
): Promise<SearchResult> => {
  try {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const response = await fetch(
      `${TMDBBASEURL}/discover/${mediaType}?api_key=${API_KEY}&language=en-US&page=1&sort_by=popularity.desc&without_genres=10749,35&with_genres=10751,16`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }
    const data = await response.json();
    const movies: SearchResult[] = data.results;
    const movie = movies[Math.floor(Math.random() * movies.length)];
    return movie.backdrop_path ? movie : movies[0];
  } catch (err) {
    throw new Error('Failed to fetch movie details');
  }
};
