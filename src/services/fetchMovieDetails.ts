const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = 'https://api.themoviedb.org/3';

export const fetchMovieDetails = async (
  id: string,
  mediaType: 'movie' | 'tv',
) => {
  const response = await fetch(
    `${API_URL}/${mediaType}/${id}?api_key=${API_KEY}&language=en-US`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  const data = await response.json();
  return data;
};
