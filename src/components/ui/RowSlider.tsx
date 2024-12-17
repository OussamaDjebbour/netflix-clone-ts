import { FC, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMoviesAndTVShows } from '../../services/fetchMoviesAndTVShows';
import Spinner from './Spinner';
import MovieSlider from './MovieSlider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
// import { Movie } from '../features/SlidersContainer';
import { useInView } from 'react-intersection-observer';
import useResponsiveMoviesPerPage from '../../hooks/useResponsiveMoviesPerPage';
import { useMediaContext } from '../../context/useMediaContext';
import { Movie } from '../../types/movieOrTv';

interface SliderProps {
  title: string;
}

const RowSlider: FC<SliderProps> = ({ title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const moviesPerPage = useResponsiveMoviesPerPage();

  const { mediaType } = useMediaContext();

  // Set up Intersection Observer
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once when it first comes into view

    rootMargin: '60px', // Load slightly before fully in view
  });

  const {
    data: movies = [],
    isLoading,
    error,
    isError,
  } = useQuery<Movie[]>({
    queryKey: [title, mediaType, moviesPerPage],
    queryFn: () => fetchMoviesAndTVShows(title, mediaType),
    enabled: inView,
  });

  // Adjust this to skip the last page if the remaining items are less than moviesPerPage
  const totalValidMovies =
    Math.floor(movies.length / moviesPerPage) * moviesPerPage;

  const prevSlide = () => {
    setFade(false);
    setCurrentIndex((prev) =>
      prev === 0 ? totalValidMovies - moviesPerPage : prev - moviesPerPage,
    );
  };

  const nextSlide = () => {
    setFade(false);
    setCurrentIndex((prev) =>
      prev + moviesPerPage >= totalValidMovies ? 0 : prev + moviesPerPage,
    );
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, [moviesPerPage]);

  useEffect(() => {
    if (!fade) {
      const timer = setTimeout(() => setFade(true), 300);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);
  // Trigger fade-in when data fetching completes

  // if (isError) throw new Error(`Error: ${error}`);
  if (isError && error) {
    console.log('errorerrorerrorerror', error);

    // throw error; // This throws the error to the ErrorBoundary
    return (
      <div className="text-white">Error loading movies: {error.message}</div>
    );
  }

  return (
    <div ref={ref} className="relative">
      {isLoading || !inView ? (
        <div className="h-full basis-full">
          <Spinner />
        </div>
      ) : (
        <div
          className={`flex basis-full gap-1 px-9 transition-all duration-500 min-[600px]:px-14 ${
            fade ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
          }`}
        >
          {movies
            .slice(currentIndex, currentIndex + moviesPerPage)
            .map((movie) => (
              <MovieSlider key={movie.id} movie={movie} />
            ))}
        </div>
      )}

      <button
        aria-label="Previous slide"
        onClick={prevSlide}
        className="absolute left-0 top-1/2 h-full w-[35px] -translate-y-1/2 transform bg-[rgba(0,0,0,0.5)] min-[600px]:w-[55px]"
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          size="3x"
          color="white"
          fontWeight="bold"
        />
      </button>

      <button
        aria-label="Next slide"
        onClick={nextSlide}
        className="absolute right-0 top-1/2 h-full w-[35px] -translate-y-1/2 transform bg-[rgba(0,0,0,0.5)] min-[600px]:w-[55px]"
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          size="3x"
          color="white"
          fontWeight="bold"
        />
      </button>
    </div>
  );
};

export default RowSlider;
