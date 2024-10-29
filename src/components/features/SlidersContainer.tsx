import React from 'react';
import RowSliderContainer from '../ui/RowSliderContainer';
import { useMediaContext } from '../../context/useMediaContext';

export interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  vote_average: number;
  poster_path: string;
}

const SlidersContainer: React.FC = () => {
  const { mediaType } = useMediaContext();

  return (
    <main className="relative w-full overflow-y-hidden overflow-x-scroll py-8 min-[600px]:py-16 min-[900px]:-mt-[11.7rem] lg:-mt-64 xl:-mt-72 2xl:-mt-[26rem] [&::-webkit-scrollbar]:hidden">
      <RowSliderContainer
        title={mediaType === 'movie' ? 'now playing' : 'on_the_air'}
      />
      <RowSliderContainer title="popular" />
      <RowSliderContainer title="upcoming" />
      <RowSliderContainer title="top rated" />
    </main>
  );
};

export default SlidersContainer;
