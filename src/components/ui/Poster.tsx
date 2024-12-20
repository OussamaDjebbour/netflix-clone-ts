import React from 'react';
import { TMDBORIGINALIMAGEURL } from '../../constants';

interface Props {
  posterPath: string;
}

const Poster: React.FC<Props> = ({ posterPath }) => {
  const imageUrl = `${TMDBORIGINALIMAGEURL}${posterPath}`;
  return (
    <img
      src={imageUrl}
      alt="poster"
      loading="lazy"
      className="absolute inset-0 h-full w-full transform object-cover"
    />
  );
};

export default Poster;
