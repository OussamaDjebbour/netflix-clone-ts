import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import { fetchMovieGenres } from '../../services/fetchMovieGenres';
import { useSearchParams } from 'react-router-dom';

// Type definition for genre
interface Genre {
  id: number;
  name: string;
}

// Movie component to display genres
const MovieGenres: React.FC<{ movieId: number }> = ({ movieId }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const mediaType = searchParams.get('mediaType') || 'movies';

  const { data: movie, error } = useQuery({
    queryKey: ['movieGenres', mediaType, movieId],
    queryFn: () => fetchMovieGenres(movieId, mediaType),
  });

  console.log('moviemoviemoviemoviemoviemovie', movie);

  if (error) {
    console.error(error);
    return <div>Error loading movie genres</div>;
  }

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
