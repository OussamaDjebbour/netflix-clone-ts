import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import Overview from '../Overview';
import Details from '../Details';
import Poster from '../Poster';
import { fetchMovieDetail } from '../../services/fetchMovieDetails';
import { useQuery } from '@tanstack/react-query';
import Spinner from './Spinner';
import MovieTrailer from './MovieTrailer';
import { MediaType, MovieTvDetails } from '../../types/tmdb';

interface RouteParams extends Record<string, string | undefined> {
  id: string;
  mediaType: MediaType;
}

const MovieAndTVDetails: React.FC = () => {
  const { id = '762509', mediaType = 'movie' } = useParams<RouteParams>();

  const { data: movieDetails } = useQuery<MovieTvDetails>({
    queryKey: ['movieDetails', id, mediaType],
    queryFn: () => fetchMovieDetail(id, mediaType),
  });

  const {
    title,
    name,
    backdrop_path: backdropPath,
    poster_path: posterPath,
    overview,
    release_date: releaseDate,
    first_air_date: firstAirDate,
    last_air_date: lastAirDate,
    genres,
    runtime,
    vote_average: voteAverage,
    number_of_seasons: numberOfSeasons,
    seasons,
  } = movieDetails ?? {};

  if (!movieDetails)
    return (
      <div className="flex h-screen basis-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="min-h-screen w-full p-4 text-white min-[500px]:p-6 md:px-8 lg:px-10">
      <header className="mb-4 mt-20 flex items-center justify-between min-[500px]:mb-6 md:mb-10 lg:mb-12">
        <h1 className="w-auto max-w-[90%] truncate text-2xl font-bold min-[600px]:text-3xl xl:mx-auto">
          {title || name}
        </h1>
      </header>

      <div className="flex flex-col flex-wrap gap-8 md:gap-10 lg:gap-8 xl:mb-20 xl:flex-row">
        <div className="relative aspect-video basis-full overflow-hidden rounded-xl min-[500px]:w-11/12 min-[500px]:pl-4 min-[600px]:w-4/5 md:w-3/5 xl:basis-[calc(50%-16px)] xl:self-center">
          <Poster posterPath={backdropPath ?? posterPath ?? ''} />
        </div>

        <div className="mb-8 basis-full text-sm min-[600px]:text-base md:mb-10 xl:mb-0 xl:basis-[calc(50%-16px)] xl:self-center">
          <Overview overview={overview || 'No overview available'} />
          <Details
            genres={genres ?? []}
            rating={voteAverage ?? 0}
            releaseDate={releaseDate ?? ''}
            firstEpisode={firstAirDate ?? ''}
            lastEpisode={lastAirDate ?? ''}
            runtime={runtime ?? 0}
            numberOfSeasons={numberOfSeasons ?? 0}
            seasons={seasons ?? []}
          />
        </div>
      </div>

      <div className="w-full min-[500px]:w-11/12 min-[600px]:w-4/5 md:w-3/5 lg:w-[calc(50%-16px)] xl:mx-auto">
        <h2 className="mb-4 text-xl font-bold min-[600px]:text-2xl lg:text-[1.6rem] xl:text-center">
          Trailer
        </h2>

        <Suspense fallback={<Spinner />}>
          <MovieTrailer movieId={movieDetails?.id} mediaType={mediaType} />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieAndTVDetails;
