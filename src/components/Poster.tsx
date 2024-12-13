// components/Poster.tsx
import React from 'react';
import { TMDBIMAGEURL } from '../constants';

interface Props {
  posterPath: string;
}

const Poster: React.FC<Props> = ({ posterPath }) => {
  return (
    <img
      src={`${TMDBIMAGEURL}${posterPath}`}
      alt="poster"
      loading="lazy"
      className="absolute inset-0 h-full w-full transform object-cover"
    />
  );
};

export default Poster;
