export const fetchMovieVideo = async (movieId: number) => {
  //   const { data } = await axios.get(
  //     `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=<<your_api_key>>&language=en-US`,
  //   );
  //   return data.results;

  const API_KEY = import.meta.env.VITE_API_KEY;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US
      `,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch Movie Video');
  }
  const data = await response.json();
  return data.results;
};
