import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { reduceLengthString } from '../../helpers/reduceLengthString';
import Button from './Button';
import { AnimatePresence, motion } from 'framer-motion';
import { TMDBIMAGEURL } from '../../constants';
import { fetchRandomMovie } from '../../services/fetchRandomMovie';
import Spinner from './Spinner';
import { useMediaContext } from '../../context/useMediaContext';

interface RandomMovieImageCoverProps {
  isShow: boolean;
  imageLoaded: boolean;
  setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const RandomMovieImageCover: React.FC<RandomMovieImageCoverProps> = ({
  isShow,
  imageLoaded,
  setImageLoaded,
}) => {
  const { mediaType } = useMediaContext();

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['random', mediaType],
    queryFn: () => fetchRandomMovie(mediaType),
  });

  useEffect(() => {
    if (movie?.backdrop_path) {
      const img = new Image();
      img.src = `${TMDBIMAGEURL}${movie?.backdrop_path}`;
      img.onload = () => {
        setImageLoaded(true);
      };
    }
  }, []);

  // movie?.backdrop_path

  if (isError) return <div>Error loading movie. Please try again later.</div>;

  return (
    <div className="relative max-h-screen w-full overflow-hidden">
      {isLoading || !imageLoaded ? (
        <div className="flex h-screen basis-full items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <img
            src={`${TMDBIMAGEURL}${movie?.backdrop_path}`}
            alt="cover image "
            className="w-full"
          />

          <div className="absolute left-4 top-12 w-full overflow-x-hidden p-4 text-white min-[500px]:top-16 small:top-[20%] md:left-8 lg:top-[15%]">
            <h1 className="w-auto max-w-[90%] truncate text-2xl font-bold min-[520px]:text-3xl min-[600px]:text-4xl md:text-[2.35rem] lg:text-[2.5rem]">
              {movie?.title}
            </h1>
            <p className="mt-2 w-[300px] text-xs min-[500px]:text-sm min-[600px]:mt-3 min-[600px]:w-[400px] min-[600px]:text-base small:mt-5 small:w-4/6 small:text-lg min-[900px]:w-3/4 lg:mt-8 lg:text-xl">
              {movie?.overview
                ? reduceLengthString(movie.overview, 130)
                : 'No overview available'}
            </p>

            <div className="mt-3 flex gap-4 text-base min-[500px]:mb-4 min-[500px]:mt-4 min-[600px]:text-base small:mt-6 small:text-lg lg:mt-8">
              <Button>Play</Button>
              <Button>My list</Button>
            </div>
          </div>
          <AnimatePresence initial={false}>
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
    </div>
  );
};

export default RandomMovieImageCover;
