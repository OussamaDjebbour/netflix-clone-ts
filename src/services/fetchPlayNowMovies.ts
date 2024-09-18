import { TMDBBASEURL } from '../constants';

export const fetchPlayNowMovies = async (movieList: string) => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const url =
    movieList !== 'trending'
      ? `${TMDBBASEURL}/movie/${movieList}?api_key=${API_KEY}&language=en-US&page=1`
      : `${TMDBBASEURL}/${movieList}/movie/day?api_key=${API_KEY}&language=en-US`;
  // ('https://api.themoviedb.org/3/trending/movie/day?language=en-US');
  // const url = `${TMDBBASEURL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  const data = await response.json();
  const movies = data.results.slice(0, 20);

  return movies;
};
