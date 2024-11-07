// components/Poster.tsx
import React from 'react';

interface Props {
  posterPath: string;
}

const Poster: React.FC<Props> = ({ posterPath }) => {
  return (
    <div
      className="h-full w-full bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${posterPath})`,
      }}
    >
      {/* Add a placeholder or a default image if posterPath is empty */}
    </div>
  );
};

export default Poster;
