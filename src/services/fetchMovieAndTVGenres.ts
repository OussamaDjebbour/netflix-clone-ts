export const fetchMovieAndTVGenres = async (
  movieId: number,
  mediaType: string,
) => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${movieId}?api_key=${API_KEY}&language=en-US
      `,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  const data = await response.json();
  return data;
};
