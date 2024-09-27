import { FC } from 'react';
import { Movie } from '../features/SlidersContainer';
import MovieSlider from './MovieSlider';
import { PERCENTAGE_TRANSFORM } from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

interface SliderProps {
  movies?: Movie[] | null;
  currentIndex: number;
  isVerySmallScreen: boolean;
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  isLargeScreen: boolean;
  nextSlide: () => void;
  prevSlide: () => void;
}

const RowSlider: FC<SliderProps> = ({
  movies,
  currentIndex,
  isVerySmallScreen,
  isSmallScreen,
  isMediumScreen,
  isLargeScreen,
  prevSlide,
  nextSlide,
}) => {
  const styles = {
    transform: isVerySmallScreen
      ? `translateX(calc(-${currentIndex * PERCENTAGE_TRANSFORM}% + ${currentIndex * 68}px))`
      : isSmallScreen
        ? `translateX(calc(-${currentIndex * PERCENTAGE_TRANSFORM}% + ${currentIndex * 108}px))`
        : isMediumScreen
          ? `translateX(calc(-${currentIndex * PERCENTAGE_TRANSFORM}% + ${currentIndex * 108}px))`
          : isLargeScreen
            ? `translateX(calc(-${currentIndex * PERCENTAGE_TRANSFORM}% + ${currentIndex * 108}px))`
            : '',
  };

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
