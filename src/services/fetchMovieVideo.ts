export const fetchMovieVideo = async (movieId: number, mediaType: string) => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${movieId}/videos?api_key=${API_KEY}&language=en-US
      `,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch Movie Video');
  }
  const data = await response.json();
  console.log('data', data);
  return data.results;
};
