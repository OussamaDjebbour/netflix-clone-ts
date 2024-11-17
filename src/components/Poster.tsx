// components/Poster.tsx
import React from 'react';
import { TMDBIMAGEURL } from '../constants';

interface Props {
  posterPath: string;
}

const Poster: React.FC<Props> = ({ posterPath }) => {
  return (
    // <div
    //   // bg-cover bg-center
    //   // mb-4 w-full md:mb-6 md:w-1/2 lg:mb-8 xl:w-1/3
    //   className="h-full w-full bg-center bg-no-repeat object-cover"
    //   style={{
    //     backgroundImage: `url(https://image.tmdb.org/t/p/w500${posterPath})`,
    //   }}
    // >
    //   {/* Add a placeholder or a default image if posterPath is empty */}
    // </div>

    <img
      src={`${TMDBIMAGEURL}${posterPath}`}
      alt="poster"
      // bg-no-repeat
      className="w-full rounded-lg bg-center object-cover"
    />
  );
};

export default Poster;
