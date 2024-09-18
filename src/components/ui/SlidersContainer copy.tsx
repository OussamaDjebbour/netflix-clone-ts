import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { fetchPlayNowMovies } from '../../services/fetchPlayNowMovies';
import { useSuspenseQuery } from '@tanstack/react-query';
import RowSliderContainer from './RowSliderContainer';
// import axios from 'axios';

export interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
}

const SlidersContainer: React.FC = () => {
  const { data: movies } = useSuspenseQuery<Movie[]>({
    queryKey: ['playNowMovies'],
    queryFn: () => fetchPlayNowMovies('top_rated'),
  });

  // useEffect(() => {
  //   if (data) {
  //     setMovies(data.results.slice(0, 20));
  //   }
  // }, [data]);
  // const [movies, setMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [moviesPerPage, setMoviesPerPage] = useState(1);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const isVerySmallScreen = useMediaQuery({ query: '(max-width: 599px)' });
  const isSmallScreen = useMediaQuery({
    query: '(min-width: 600px) and (max-width: 767px)',
  });
  const isMediumScreen = useMediaQuery({
    query: '(min-width: 768px) and (max-width: 1023px)',
  });
  const isLargeScreen = useMediaQuery({
    query: '(min-width: 1024px)',
  });

  useEffect(() => {
    if (isVerySmallScreen) {
      setCurrentIndex(0);
      setMoviesPerPage(1);
    } else if (isSmallScreen) {
      setCurrentIndex(0);
      setMoviesPerPage(2);
    } else if (isMediumScreen) {
      setCurrentIndex(0);
      setMoviesPerPage(4);
    } else if (isLargeScreen) {
      setCurrentIndex(0);
      setMoviesPerPage(5);
    }
  }, [isSmallScreen, isMediumScreen, isLargeScreen]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  // console.log('currentIndex', currentIndex);
  // console.log('moviesPerPage', moviesPerPage);
  // console.log('totalPages', totalPages);

  return (
    <div className="relative w-full overflow-y-hidden overflow-x-scroll py-8 min-[600px]:py-16 md:-mt-40 lg:-mt-72 [&::-webkit-scrollbar]:hidden">
      <RowSliderContainer
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

export default SlidersContainer;
