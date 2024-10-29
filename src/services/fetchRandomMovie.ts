import { TMDBBASEURL, TMDBIMAGEURL } from '../constants';

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
}

export const fetchRandomMovie = async (mediaType: string): Promise<Movie> => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const response = await fetch(
    `${TMDBBASEURL}/${mediaType === 'movies' ? 'discover/movie' : 'discover/tv'}?api_key=${API_KEY}&language=en-US&page=1&sort_by=popularity.desc&without_genres=10749,35&with_genres=10751,16`,
    // `https://api.themoviedb.org/3/${mediaType === 'movies' ? 'movie' : 'tv'}/${mediaType === 'movies' ? 'now_playing' : 'on_the_air'}?api_key=${API_KEY}&language=en-US&page=1&with_genres=16`,
  );
  // const response = await fetch(
  //   `${TMDBBASEURL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1`,
  // );
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  const data = await response.json();
  const movies: Movie[] = data.results;
  // movies.map((m) => console.log(m.title));
  const movie = movies[Math.floor(Math.random() * movies.length)];
  // console.log('moviemoviemoviemoviemoviemoviemovie', movie);
  return movie.backdrop_path ? movie : movies[0];
  // return movies[1];
};

// export const fetchRandomMovie = async (): Promise<Movie> => {
//   const API_KEY = import.meta.env.VITE_API_KEY;
//   const response = await fetch(
//     `${TMDBBASEURL}/trending/movie/day?api_key=${API_KEY}&language=en-US`,
//   );
//   // const response = await fetch(
//   //   `${TMDBBASEURL}/now_playing/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1`,
//   // );
//   const data = await response.json();
//   const movies: Movie[] = data.results;

//   const randomMovie = movies[Math.floor(Math.random() * movies.length)];

//   // Get the backdrop image path
//   const backdropPath = randomMovie.backdrop_path;

//   // Construct the URL for the 'original' size image (which is the largest available size)
//   const imageUrl = `https://image.tmdb.org/t/p/original${backdropPath}`;

//   // You can log the image URL or use it for validation
//   console.log(imageUrl);

//   // Return the movie object as it is (you've now ensured the highest quality image)
//   return randomMovie;
// };
