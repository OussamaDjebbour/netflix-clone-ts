// MovieDetails.tsx
import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import Overview from '../Overview';
import Details from '../Details';
import Cast from '../Cast';
import Trailer from '../Trailer';
import Reviews from '../Reviews';
import Poster from '../Poster';
// import { MovieDetailsResponse } from '../../types/tmdb';
import { fetchMovieDetail } from '../../services/fetchMovieDetails';
import WatchlistButton from '../WatchlistButton';
import { useQuery } from '@tanstack/react-query';
import Spinner from './Spinner';
import MovieTrailer from './MovieTrailer';
import { useMediaContext } from '../../context/useMediaContext';
// import WatchlistButton from '../WatchListButton';

// interface Props {}

interface RouteParams extends Record<string, string | undefined> {
  id: string;
  mediaType: 'movie' | 'tv';
}

const MovieDetails: React.FC = () => {
  const { id = '', mediaType = 'movie' } = useParams<RouteParams>();
  // const { mediaType } = useMediaContext();

  // const [movieDetails, setMovieDetails] =
  //   React.useState<MovieDetailsResponse | null>(null);

  // React.useEffect(() => {
  //   const fetchDetails = async () => {
  //     const response = await fetchMovieDetail(id);
  //     setMovieDetails(response);
  //   };
  //   fetchDetails();
  // }, [id]);

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
        {/* <h1 className="text-xl font-bold lg:text-3xl">{movieDetails.title}</h1> */}
        {/* min-[520px]:text-3xl min-[600px]:text-4xl md:text-[2.35rem] lg:text-[2.5rem] */}
        <h1 className="w-auto max-w-[90%] truncate text-2xl font-bold min-[600px]:text-3xl xl:mx-auto">
          {movieDetails.title || movieDetails.name}
        </h1>
        {/* <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
          Share
        </button> */}
      </header>
      {/* -mx-4 */}
      {/* flex-shrink-0 grow-0 basis-full min-[600px]:basis-[calc(50%-2px)] */}
      <div className="flex flex-col flex-wrap gap-8 md:gap-10 lg:gap-8 xl:mb-20 xl:flex-row">
        {/* <div className="mb-4 flex-shrink-0 grow-0"> */}
        <div className="basis-full min-[500px]:w-11/12 min-[500px]:pl-4 min-[600px]:w-4/5 md:w-3/5 xl:basis-[calc(50%-16px)] xl:self-center">
          <Poster
            posterPath={movieDetails.backdrop_path || movieDetails.poster_path}
          />
        </div>
        {/* min-[600px]:text-base small:mt-5 small:w-4/6 small:text-lg min-[900px]:w-3/4 lg:mt-8 lg:text-xl xl:basis-2/3 mb-4 md:mb-6 lg:mb-8*/}
        <div className="mb-8 basis-full text-sm min-[600px]:text-base md:mb-10 xl:mb-0 xl:basis-[calc(50%-16px)] xl:self-center">
          {/* <div className="mb-4 basis-full md:mb-6 md:basis-1/2 lg:mb-8 xl:basis-2/3"> */}
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
      {/* <div className="mb-4 md:mb-6 lg:mb-8">
        <Cast cast={movieDetails.credits?.cast} />
      </div> */}

      <div className="w-full min-[500px]:w-11/12 min-[600px]:w-4/5 md:w-3/5 lg:w-[calc(50%-16px)] xl:mx-auto">
        {/* <Trailer trailerPath={movieDetails.videos?.results[0].key} text-[#00CED1]/> */}
        <h2 className="mb-4 text-xl font-bold min-[600px]:text-2xl lg:text-[1.6rem] xl:text-center">
          Trailer
        </h2>

        <Suspense fallback={<Spinner />}>
          <MovieTrailer movieId={movieDetails?.id} />
        </Suspense>
      </div>
      {/* <div className="mb-4 md:mb-6 lg:mb-8">
        <Reviews movieId={movieDetails.id} />
      </div> */}
      {/* <div className="mb-4 md:mb-6 lg:mb-8">
        <WatchlistButton movieId={movieDetails.id} />
      </div> */}
      {/* <div className="mb-4 md:mb-6 lg:mb-8">
        <ExternalLinks
          officialWebsite={movieDetails.homepage}
          socialMedia={movieDetails.social_media}
        />
      </div> */}
    </div>
  );
};

export default MovieDetails;
