import { FC, useEffect, useState } from 'react';
import { Movie } from '../features/SlidersContainer';
import MovieSlider from './MovieSlider';
import { PERCENTAGE_TRANSFORM } from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchPlayNowMovies } from '../../services/fetchPlayNowMovies';
import { transformString } from '../../helpers/transformString';
import replaceSpacesWithUnderscores from '../../helpers/replaceSpacesWithUndescores';
import { useMediaQuery } from 'react-responsive';

interface SliderProps {
  title: string;
}

const RowSlider: FC<SliderProps> = ({ title }) => {
  const { data: movies } = useSuspenseQuery<Movie[]>({
    queryKey: [transformString(title)],
    queryFn: () => fetchPlayNowMovies(replaceSpacesWithUnderscores(title)),
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [moviesPerPage, setMoviesPerPage] = useState(1);
  // const totalPages = movies ? Math.floor(movies.length / moviesPerPage) : 20;
  const totalPages = Math.floor(movies.length / moviesPerPage);
  console.log('totalPages', totalPages);

  // const isVerySmallScreen = useMediaQuery({ query: '(max-width: 599px)' });
  // const isSmallScreen = useMediaQuery({
  //   query: '(min-width: 600px) and (max-width: 767px)',
  // });
  // const isMediumScreen = useMediaQuery({
  //   query: '(min-width: 768px) and (max-width: 1023px)',
  // });
  // const isLargeScreen = useMediaQuery({
  //   query: '(min-width: 1024px)',
  // });

  const isVerySmallScreen = useMediaQuery({ query: '(max-width: 599px)' });
  const isSmallScreen = useMediaQuery({
    query: '(min-width: 600px) and (max-width: 679px)',
  });
  // const isSmallScreen = useMediaQuery({
  //   query: '(min-width: 600px) and (max-width: 767px)',
  // });
  const isMediumScreen = useMediaQuery({
    query: '(min-width: 680px) and (max-width: 899px)',
  });
  const isLargeScreen = useMediaQuery({
    query: '(min-width: 900px) and (max-width: 1023px)',
  });
  const isVeryLargeScreen = useMediaQuery({
    query: '(min-width: 1024px)',
  });

  // const styles = {
  //   transform: isVerySmallScreen
  //     ? `translateX(calc(-${currentIndex * PERCENTAGE_TRANSFORM}% + ${currentIndex * 68}px))`
  //     : isSmallScreen
  //       ? `translateX(calc(-${currentIndex * PERCENTAGE_TRANSFORM}% + ${currentIndex * 108}px))`
  //       : isMediumScreen
  //         ? `translateX(calc(-${currentIndex * PERCENTAGE_TRANSFORM}% + ${currentIndex * 108}px))`
  //         : isLargeScreen
  //           ? `translateX(calc(-${currentIndex * PERCENTAGE_TRANSFORM}% + ${currentIndex * 108}px))`
  //           : '',
  // };

  const styles = {
    transform: isVerySmallScreen
      ? `translateX(calc(-${currentIndex * PERCENTAGE_TRANSFORM}% + ${currentIndex * 68}px))`
      : isSmallScreen || isMediumScreen || isLargeScreen || isVeryLargeScreen
        ? `translateX(calc(-${currentIndex * PERCENTAGE_TRANSFORM}% + ${currentIndex * 108}px))`
        : '',
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (isVerySmallScreen) {
      setCurrentIndex(0);
      setMoviesPerPage(1);
    } else if (isSmallScreen) {
      setCurrentIndex(0);
      setMoviesPerPage(2);
    } else if (isMediumScreen) {
      setCurrentIndex(0);
      setMoviesPerPage(3);
    } else if (isLargeScreen) {
      setCurrentIndex(0);
      setMoviesPerPage(4);
    } else if (isVeryLargeScreen) {
      setCurrentIndex(0);
      setMoviesPerPage(5);
    }
  }, [
    isVerySmallScreen,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    isVeryLargeScreen,
  ]);

  // useEffect(() => {
  //   if (isVerySmallScreen) {
  //     setCurrentIndex(0);
  //     setMoviesPerPage(1);
  //   } else if (isSmallScreen) {
  //     setCurrentIndex(0);
  //     setMoviesPerPage(2);
  //   } else if (isMediumScreen) {
  //     setCurrentIndex(0);
  //     setMoviesPerPage(4);
  //   } else if (isLargeScreen) {
  //     setCurrentIndex(0);
  //     setMoviesPerPage(5);
  //   }
  // }, [isSmallScreen, isMediumScreen, isLargeScreen]);

  return (
    <div className="relative">
      <div
        className="flex basis-full gap-1 px-9 transition-transform duration-500 min-[600px]:px-14"
        style={{ ...styles }}
      >
        {/* {currentIndex === 0 && movies?.[movies?.length - 1] && (
        <div className="absolute -left-[94%] h-full w-full flex-shrink-0 min-[600px]:-left-[48%]">
          <MovieSlider movie={movies?.[movies.length - 1]} currentIndex={-2} />
        </div>
      )} */}

        {movies?.map((movie) => (
          <MovieSlider
            key={movie.id}
            movie={movie}
            currentIndex={currentIndex}
          />
        ))}
      </div>

      {/* Next and Prev buttons */}
      <button
        onClick={prevSlide}
        // px-3 py-2
        className="absolute left-0 top-1/2 h-full w-[35px] -translate-y-1/2 transform bg-[rgba(0,0,0,0.5)] min-[600px]:w-[55px]"
        // className="absolute left-2 top-1/2 -translate-y-1/2 transform"
      >
        {/* {'<'} */}
        <FontAwesomeIcon
          icon={faChevronLeft}
          size="3x"
          color="white"
          fontWeight="bold"
        />
        {/* <FontAwesomeIcon icon={faAngleLeft} size="3x" /> */}
      </button>
      {/* <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 transform bg-gray-800 px-3 py-2 text-white"
      >
        Next
      </button> */}

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 h-full w-[35px] -translate-y-1/2 transform bg-[rgba(0,0,0,0.5)] min-[600px]:w-[55px]"
        // className="absolute right-2 top-1/2 -translate-y-1/2"
        // className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full px-2 py-4 text-9xl text-white"
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
