import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMovieAndTVGenres } from '../../services/fetchMovieAndTVGenres';
import { useMediaContext } from '../../context/useMediaContext';
import { Genre } from '../../types/tmdb';

interface MovieGenresProps {
  movieId: string;
}

// Movie component to display genres
const MovieGenres: React.FC<MovieGenresProps> = ({ movieId }) => {
  const { mediaType } = useMediaContext();

  const { data: movie, error } = useQuery({
    queryKey: [`${mediaType}Genres`, mediaType, movieId],
    queryFn: () => fetchMovieAndTVGenres(movieId, mediaType),
  });

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
            `${genre.name}${index !== arr.length - 1 ? ', ' : '.'}`,
        )}
      </p>
    </div>
  );
};

export default MovieGenres;
