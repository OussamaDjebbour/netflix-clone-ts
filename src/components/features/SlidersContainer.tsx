import React from 'react';
import RowSliderContainer from '../ui/RowSliderContainer';
import { useSearchParams } from 'react-router-dom';
import ProjectsList from '../ui/ProjectsList';
// import axios from 'axios';

export interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  vote_average: number;
  poster_path: string;
}

const SlidersContainer: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const mediaType = searchParams.get('mediaType') || 'movies';
  console.log('mediaTypemediaTypemediaTypemediaTypemediaType', mediaType);
  // return (
  //   <main className="relative w-full overflow-y-hidden overflow-x-scroll py-8 min-[600px]:py-16 min-[900px]:-mt-[11.7rem] lg:-mt-64 xl:-mt-72 2xl:-mt-[26rem] [&::-webkit-scrollbar]:hidden">
  //     {/* <RowSliderContainer title="now playing" /> */}
  //     <RowSliderContainer title="popular" />
  //     <RowSliderContainer title="trending" />
  //     {/* <RowSliderContainer title="upcoming" /> */}
  //     <RowSliderContainer title="top rated" />
  //     <RowSliderContainer title="airing_today" />
  //     <RowSliderContainer title="on_the_air" />
  //     {/* <RowSliderContainer title="latest" /> */}
  //   </main>
  // );

  return (
    <main className="relative w-full overflow-y-hidden overflow-x-scroll py-8 min-[600px]:py-16 min-[900px]:-mt-[11.7rem] lg:-mt-64 xl:-mt-72 2xl:-mt-[26rem] [&::-webkit-scrollbar]:hidden">
      <RowSliderContainer
        title={mediaType === 'movies' ? 'now playing' : 'on_the_air'}
      />
      <RowSliderContainer title="popular" />
      <RowSliderContainer title="trending" />
      {/* <RowSliderContainer title="upcoming" /> */}
      {/* <RowSliderContainer title="top rated" /> */}
      {/* <RowSliderContainer title="airing_today" /> */}
      {/* <RowSliderContainer title="on_the_air" /> */}
      {/* <RowSliderContainer title="latest" /> */}
      {/* <ProjectsList /> */}
    </main>
  );
};

export default SlidersContainer;
