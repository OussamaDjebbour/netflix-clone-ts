import React, { useState } from 'react';
import Navbar from '../ui/Navbar';
import RandomMovieImageCover from '../ui/RandomMovieImageCover';
import { TMDBBASEURL, TMDBIMAGEURL } from '../../constants';
import { useSuspenseQuery } from '@tanstack/react-query';
import HoverImageReveal from '../ui/test';
import SlidersContainer from '../ui/SlidersContainer';
import MovieGenres from '../ui/MovieGenres';

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
}

const API_KEY = import.meta.env.VITE_API_KEY;

const fetchNowPlayingMovies = async (): Promise<Movie[]> => {
  const response = await fetch(
    `${TMDBBASEURL}/movie/now_playing?language=en-US&page=1&api_key=${API_KEY}`,
  );
  const data = await response.json();
  const movies: Movie[] = data.results;

  // return movies[Math.floor(Math.random() * movies?.length)];
  return movies;
};

const HeroSection: React.FC = () => {
  const [isShow, setIsShow] = useState(false);

  // const movies = fetchNowPlayingMovies();
  // console.log('movies', movies);

  const { data: movies } = useSuspenseQuery({
    queryKey: ['nowPlayingMovies'],
    queryFn: fetchNowPlayingMovies,
    // enabled: false,
  });

  // console.log('movies', movies);

  return (
    <>
      <div className="relative w-full">
        <Navbar setIsShow={setIsShow} />
        <RandomMovieImageCover isShow={isShow} />
        {/* <div className="flex min-w-full small:absolute small:bottom-0 small:z-50">
          {movies?.map((movie: Movie) => (
            <div className="w-full" key={movie.id}>
              <img
                className="w-full"
                src={`${TMDBIMAGEURL}${movie.backdrop_path}`}
              />
            </div>
          ))}
        </div> */}
        <SlidersContainer />
        {/* <MovieGenres movieId={movies?.[0].id} /> */}
        <HoverImageReveal />
      </div>

      {/* <a
        href="#"
        className="group mx-auto block max-w-xs space-y-3 rounded-lg bg-white p-6 shadow-lg ring-1 ring-slate-900/5 hover:scale-150 hover:bg-sky-500 hover:ring-sky-500"
      >
        <div className="flex items-center space-x-3">
          <svg
            className="h-6 w-6 stroke-sky-500 group-hover:stroke-white"
            fill="none"
            viewBox="0 0 24 24"
          ></svg>
          <h3 className="text-sm font-semibold text-slate-900 group-hover:text-white">
            New project
          </h3>
        </div>
        <p className="text-sm text-slate-500 opacity-0 group-hover:text-white group-hover:opacity-100">
          Create a new project from a variety of starting templates.
        </p>
      </a> */}
      {/* <HoverImageReveal /> */}
    </>
  );
};

export default HeroSection;
