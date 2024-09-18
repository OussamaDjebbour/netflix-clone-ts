import { FC } from 'react';
import RowSlider from './RowSlider';
import { Movie } from './SlidersContainer';

interface RowSliderContainer {
  movies: Movie[] | null;
  currentIndex: number;
  isVerySmallScreen: boolean;
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  isLargeScreen: boolean;
  prevSlide: () => void;
  nextSlide: () => void;
}

const RowSliderContainer: FC<RowSliderContainer> = ({
  movies,
  currentIndex,
  isVerySmallScreen,
  isSmallScreen,
  isMediumScreen,
  isLargeScreen,
  prevSlide,
  nextSlide,
}) => {
  return (
    <div className="mb-10">
      <h2 className="mb-5 pl-8 text-2xl font-semibold text-[rgba(255,255,255,0.8)] min-[600px]:pl-12 min-[600px]:text-3xl">
        Now Playing
      </h2>

      <RowSlider
        movies={movies}
        currentIndex={currentIndex}
        isVerySmallScreen={isVerySmallScreen}
        isSmallScreen={isSmallScreen}
        isMediumScreen={isMediumScreen}
        isLargeScreen={isLargeScreen}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
      />
    </div>
  );
};

export default RowSliderContainer;
