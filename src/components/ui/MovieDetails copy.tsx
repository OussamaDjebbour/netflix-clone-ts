// MovieDetails.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
// import { fetchMovieDetails } from '../api/tmdb';
// import { MovieDetailsResponse } from '../types/tmdb';
// import { Poster } from '../components/Poster';
import Overview from '../Overview';
import Details from '../Details';
import Cast from '../Cast';
import Trailer from '../Trailer';
import Reviews from '../Reviews';
// import WatchlistButton from '../WatchlistButton';
// import ExternalLinks from '../ExternalLinks';
import Poster from '../Poster';
import WatchlistButton from '../WatchListButton';
import { MovieTvDetails } from '../../types/tmdb';
import { fetchMovieTvDetails } from '../../services/fetchMovieDetails';
// import { MovieDetailsResponse } from '../../types/tmdb';
// import { fetchMovieDetails } from '../../services/fetchMovieDetails';

interface Props {}

const MovieDetails: React.FC<Props> = () => {
  const { id = '' } = useParams();
  const [movieDetails, setMovieDetails] =
    // React.useState<MovieDetailsResponse | null>(null);
    React.useState<MovieTvDetails | null>(null);

  React.useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetchMovieTvDetails(id, 'movie');
      setMovieDetails(response);
    };
    fetchDetails();
  }, [id]);

  if (!movieDetails) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{movieDetails.title}</h1>
        <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
          Share
        </button>
      </header>
      <div className="-mx-4 flex flex-wrap">
        <div className="mb-4 w-full md:mb-6 md:w-1/2 lg:mb-8 xl:w-1/3">
          <Poster posterPath={movieDetails.poster_path} />
        </div>
        <div className="mb-4 w-full md:mb-6 md:w-1/2 lg:mb-8 xl:w-2/3">
          <Overview overview={movieDetails.overview} />
          <Details
            genres={movieDetails.genres}
            rating={movieDetails.vote_average}
            releaseDate={movieDetails.release_date}
            runtime={movieDetails.runtime}
          />
        </div>
      </div>
      <div className="mb-4 md:mb-6 lg:mb-8">
        <Cast cast={movieDetails.credits?.cast} />
      </div>
      <div className="mb-4 md:mb-6 lg:mb-8">
        <Trailer trailerPath={movieDetails.videos?.results[0].key} />
      </div>
      <div className="mb-4 md:mb-6 lg:mb-8">
        <Reviews reviews={movieDetails.reviews?.results} />
      </div>
      <div className="mb-4 md:mb-6 lg:mb-8">
        <WatchlistButton movieId={movieDetails.id} />
      </div>
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
