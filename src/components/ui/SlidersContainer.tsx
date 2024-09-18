import React from 'react';
import RowSliderContainer from './RowSliderContainer';
// import axios from 'axios';

export interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  vote_average: number;
}

const SlidersContainer: React.FC = () => {
  return (
    <section className="relative w-full overflow-y-hidden overflow-x-scroll py-8 min-[600px]:py-16 min-[900px]:-mt-[11.7rem] lg:-mt-64 xl:-mt-72 2xl:-mt-[26rem] [&::-webkit-scrollbar]:hidden">
      <RowSliderContainer title="now playing" />
      <RowSliderContainer title="popular" />
      <RowSliderContainer title="trending" />
      <RowSliderContainer title="upcoming" />
      <RowSliderContainer title="top rated" />
    </section>
  );
};

export default SlidersContainer;
