// MovieTvShowsDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieTvDetails } from '../../types/tmdb';
import { fetchMovieTvDetails } from '../../services/fetchMovieDetails';
// import { fetchMovieTvDetails } from './api';
// import { MovieTvDetails } from './types';

interface RouteParams extends Record<string, string | undefined> {
  id: string;
  mediaType: 'movie' | 'tv';
}

const MovieTvShowsDetails: React.FC = () => {
  const { id = '', mediaType } = useParams<RouteParams>();
  const [details, setDetails] = useState<MovieTvDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const data = await fetchMovieTvDetails(id, 'movie');
        setDetails(data);
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setLoading(false);
      }
    };
    getDetails();
  }, [id, mediaType]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (!details) return <div className="text-center">No data found</div>;

  return (
    <div className="mx-auto max-w-4xl p-4">
      {/* Header Section */}
      <div className="flex items-center space-x-4">
        <img
          src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
          alt={details.title || details.name}
          className="w-64 rounded shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold">
            {details.title || details.name}
          </h1>
          <p className="text-gray-500">
            {details.release_date || details.first_air_date}
          </p>
          <div className="mt-2 flex items-center space-x-2">
            <span className="font-semibold text-yellow-400">
              {details.vote_average}/10
            </span>
            <span className="text-gray-400">•</span>
            <span>{details.popularity} popularity</span>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="mt-4">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p className="mt-2 text-gray-200">{details.overview}</p>
      </div>

      {/* Genre Section */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Genres</h2>
        <div className="mt-2 flex space-x-2">
          {details.genres.map((genre) => (
            <span
              key={genre.id}
              className="rounded-full bg-gray-700 px-3 py-1 text-sm"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieTvShowsDetails;
