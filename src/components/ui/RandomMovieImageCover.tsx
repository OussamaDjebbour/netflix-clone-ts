import React, { useState } from 'react';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { reduceLengthString } from '../../helpers/reduceLengthString';
import Button from './Button';
import { AnimatePresence, motion } from 'framer-motion';
import { TMDBBASEURL, TMDBIMAGEURL } from '../../constants';
import { fetchRandomMovie } from '../../services/fetchRandomMovie';
import { useMediaQuery } from 'react-responsive';
import { useSearchParams } from 'react-router-dom';
import Spinner from './Spinner';

interface RandomMovieImageCoverProps {
  isShow: boolean;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  // poster_path: string;
}

const API_KEY = import.meta.env.VITE_API_KEY;

// const fetchRandomMovie = async (): Promise<Movie> => {
//   const response = await fetch(
//     `${TMDBBASEURL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1`,
//   );
//   const data = await response.json();
//   const movies: Movie[] = data.results;
//   return movies[Math.floor(Math.random() * movies.length)];
// };

const RandomMovieImageCover: React.FC<RandomMovieImageCoverProps> = ({
  isShow,
}) => {
  // const [isShow, setIsShow] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  // Set default value for "mediaType" parameter if it's missing
  const mediaType = searchParams.get('mediaType') || 'movies';

  const { data: movie, isLoading } = useQuery({
    queryKey: ['random', mediaType],
    queryFn: () => fetchRandomMovie(mediaType),
  });

  const isSmallScreen = useMediaQuery({
    query: '(max-width: 430px)',
  });

  console.log(
    '`${TMDBIMAGEURL}${TVSHOWWWWWWWSSSSSSSS.backdrop_path}`',
    `${TMDBIMAGEURL}${movie?.backdrop_path}`,
    movie,
  );

  return (
    <div className="relative max-h-screen w-full overflow-hidden">
      {isLoading ? (
        <div className="flex h-screen min-h-[500px] basis-full items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          {' '}
          <img
            src={`${TMDBIMAGEURL}${movie?.backdrop_path}`}
            alt="cover image "
            className="w-full"
          />
          {/* <div className="p-4 md:absolute md:bottom-4 md:left-4 md:z-10 md:text-white"> */}
          <div className="absolute left-4 top-12 w-full overflow-x-hidden p-4 text-white min-[500px]:top-16 small:top-[20%] md:left-8 lg:top-[15%]">
            {/* <h1 className="text-2xl font-bold max-[500px]:hidden"> */}
            <h1 className="w-auto max-w-[90%] truncate text-2xl font-bold min-[520px]:text-3xl min-[600px]:text-4xl md:text-[2.35rem] lg:text-[2.5rem]">
              {/* {isSmallScreen
                ? reduceLengthString(movie?.title, 21)
                : movie?.title} */}
              {movie?.title}
            </h1>
            <p className="mt-2 w-[300px] text-xs min-[500px]:text-sm min-[600px]:mt-3 min-[600px]:w-[400px] min-[600px]:text-base small:mt-5 small:w-4/6 small:text-lg min-[900px]:w-3/4 lg:mt-8 lg:text-xl">
              {/* {reduceLengthString(movie?.overview, 130)} */}
              {movie?.overview
                ? reduceLengthString(movie.overview, 130)
                : 'No overview available'}
            </p>

            <div className="mt-3 flex gap-4 text-base min-[500px]:mb-4 min-[500px]:mt-4 min-[600px]:text-base small:mt-6 small:text-lg lg:mt-8">
              <Button>Play</Button>
              <Button>My list</Button>
            </div>
          </div>
          <AnimatePresence>
            {isShow && (
              <motion.ul
                key="dropdown"
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.4 }}
                className="fixed top-14 z-50 flex w-full flex-col gap-2 bg-black px-4 py-4 font-medium text-white transition-all duration-300 ease-in min-[500px]:px-8 min-[600px]:text-xl small:hidden"
              >
                <li className="hover:cursor-pointer">Home</li>
                <li className="hover:cursor-pointer">TV Shows</li>
                <li className="hover:cursor-pointer">Movies</li>
                <li className="hover:cursor-pointer">New</li>
                <li className="hover:cursor-pointer">My List</li>
              </motion.ul>
            )}
          </AnimatePresence>
        </>
      )}

      {/* <div className="h-28 bg-[linear-gradient(100deg,transparent,rgba(37,37,37,0.61),#111)]" /> */}
      {/* <div className="h-28 w-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0.9)100%)]" /> */}
    </div>
  );
};

export default RandomMovieImageCover;
