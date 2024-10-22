import { useInView } from 'react-intersection-observer';
import { Movie } from '../features/SlidersContainer';
import MovieSlider from './MovieSlider';
import { FC } from 'react';
import Spinner from './Spinner';

interface LazyMovieSliderProps {
  movie: Movie;
  currentIndex: number;
}

const LazyMovieSlider: FC<LazyMovieSliderProps> = ({ movie, currentIndex }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once when it first comes into view
    rootMargin: '100px', // Load slightly before fully in view
  });

  return (
    <div ref={ref} className="basis-full">
      {inView ? (
        <MovieSlider currentIndex={currentIndex} movie={movie} />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default LazyMovieSlider;
