import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import { fetchMovieGenres } from '../../services/fetchMovieGenres';

// Type definition for genre
interface Genre {
  id: number;
  name: string;
}

// Movie component to display genres
const MovieGenres: React.FC<{ movieId: number }> = ({ movieId }) => {
  const { data: movie } = useSuspenseQuery({
    queryKey: ['movieGenres', movieId],
    queryFn: () => fetchMovieGenres(movieId),
  });

  // Extract genres from movie details
  const genres: Genre[] = movie?.genres || [];

  return (
    <div className="text-[#c4c4c4]">
      <p className="text-left text-[8px]">
        {genres.map(
          (genre, index, arr) =>
            `${genre.name}${index !== arr.length - 1 ? ', ' : ''}`,
        )}
      </p>
    </div>
  );
};

export default MovieGenres;
