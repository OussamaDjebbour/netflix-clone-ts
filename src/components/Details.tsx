// components/Details.tsx
import React from 'react';

interface Props {
  genres: { id: number; name: string }[];
  rating: number;
  releaseDate: string;
  runtime: number;
}

const Details: React.FC<Props> = ({ genres, rating, releaseDate, runtime }) => {
  return (
    <div className="mb-4 text-lg leading-relaxed">
      <h2 className="mb-2 text-2xl font-bold">Details</h2>
      <ul>
        <li>
          <span className="font-bold">Genres:</span>{' '}
          {genres.map((genre) => genre.name).join(', ')}
        </li>
        <li>
          <span className="font-bold">Rating:</span> {rating}/10
        </li>
        <li>
          <span className="font-bold">Release Date:</span> {releaseDate}
        </li>
        <li>
          <span className="font-bold">Runtime:</span> {runtime} minutes
        </li>
      </ul>
    </div>
  );
};

export default Details;
