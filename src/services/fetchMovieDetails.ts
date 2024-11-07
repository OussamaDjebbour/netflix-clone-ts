import { MovieTvDetails } from '../types/tmdb';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = 'https://api.themoviedb.org/3';

export const fetchMovieTvDetails = async (
  id: string,
  mediaType: 'movie' | 'tv',
): Promise<MovieTvDetails> => {
  const response = await fetch(
    `${API_URL}/${mediaType}/${id}?api_key=${API_KEY}&language=en-US`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  const data = await response.json();
  console.log('data', data);
  return data;
  //   const { data } = await axios.get<MovieTvDetails>(
  //     `${TMDB_BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}&language=en-US`,
  //   );
  //   return data;
};

export const fetchMovieDetail = async (id: string) => {
  const response = await fetch(
    `${API_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  const data = await response.json();
  console.log('data', data);
  return data;

  //   const response = await axios.get(`${API_URL}/movie/${id}`, {
  //     params: {
  //       api_key: API_KEY,
  //     },
  //   });
  //   return response.data;
};

// export { fetchMovieDetails };
