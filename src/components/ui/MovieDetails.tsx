// MovieDetails.tsx
import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import Overview from '../Overview';
import Details from '../Details';
import Poster from '../Poster';
// import { MovieDetailsResponse } from '../../types/tmdb';
import { fetchMovieDetail } from '../../services/fetchMovieDetails';
import { useQuery } from '@tanstack/react-query';
import Spinner from './Spinner';
import MovieTrailer from './MovieTrailer';

interface RouteParams extends Record<string, string | undefined> {
  id: string;
  mediaType: 'movie' | 'tv';
}

const MovieDetails: React.FC = () => {
  const { id = '', mediaType = 'movie' } = useParams<RouteParams>();
  // const { mediaType } = useMediaContext();

  const { data: movieDetails } = useQuery({
    queryKey: ['movieDetails', id, mediaType],
    queryFn: () => fetchMovieDetail(id, mediaType),
  });

  if (!movieDetails)
    return (
      <div className="flex h-screen basis-full items-center justify-center">
        <Spinner />
      </div>
    );

  console.log('movieDetails', movieDetails);

  return (
    <div className="min-h-screen w-full p-4 text-white min-[500px]:p-6 md:px-8 lg:px-10">
      <header className="mb-4 mt-20 flex items-center justify-between min-[500px]:mb-6 md:mb-10 lg:mb-12">
        <h1 className="w-auto max-w-[90%] truncate text-2xl font-bold min-[600px]:text-3xl xl:mx-auto">
          {movieDetails.title || movieDetails.name}
        </h1>
      </header>

      <div className="flex flex-col flex-wrap gap-8 md:gap-10 lg:gap-8 xl:mb-20 xl:flex-row">
        <div className="relative aspect-video basis-full overflow-hidden rounded-xl min-[500px]:w-11/12 min-[500px]:pl-4 min-[600px]:w-4/5 md:w-3/5 xl:basis-[calc(50%-16px)] xl:self-center">
          <Poster
            posterPath={movieDetails.backdrop_path || movieDetails.poster_path}
          />
        </div>

        <div className="mb-8 basis-full text-sm min-[600px]:text-base md:mb-10 xl:mb-0 xl:basis-[calc(50%-16px)] xl:self-center">
          <Overview overview={movieDetails.overview} />
          <Details
            genres={movieDetails.genres}
            rating={movieDetails.vote_average}
            releaseDate={movieDetails.release_date}
            firstEpisode={movieDetails.first_air_date}
            lastEpisode={movieDetails.last_air_date}
            runtime={movieDetails.runtime}
            numberOfSeasons={movieDetails.number_of_seasons}
            seasons={movieDetails.seasons}
          />
        </div>
      </div>

      <div className="w-full min-[500px]:w-11/12 min-[600px]:w-4/5 md:w-3/5 lg:w-[calc(50%-16px)] xl:mx-auto">
        <h2 className="mb-4 text-xl font-bold min-[600px]:text-2xl lg:text-[1.6rem] xl:text-center">
          Trailer
        </h2>

        <Suspense fallback={<Spinner />}>
          <MovieTrailer movieId={movieDetails?.id} />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetails;
