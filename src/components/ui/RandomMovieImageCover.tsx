import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { reduceLengthString } from '../../helpers/reduceLengthString';
import Button from './Button';
import { fetchRandomMovie } from '../../services/fetchRandomMovie';
import Spinner from './Spinner';
import { useMediaContext } from '../../context/useMediaContext';
import { useIsImageLoadedContext } from '../../context/useIsImageLoadedContext';
import { useNavigate } from 'react-router-dom';
import { TMDBORIGINALIMAGEURL } from '../../constants';

const RandomMovieImageCover: React.FC = () => {
  const { mediaType } = useMediaContext();
  const { isImageLoaded, handleChangeIsImageLoaded } =
    useIsImageLoadedContext();
  const navigate = useNavigate();

  const {
    data: movieOrTv,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`randomImage${mediaType}`, mediaType],
    queryFn: () => fetchRandomMovie(mediaType),
  });

  const imagePath = movieOrTv?.backdrop_path || movieOrTv?.poster_path;
  const imageUrl = `${TMDBORIGINALIMAGEURL}${imagePath}`;

  useEffect(() => {
    if (imagePath) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        handleChangeIsImageLoaded(true);
      };
    }
  }, [imagePath]);

  if (isError && error) {
    console.log('errorerrorerrorerror', error);
  }

  if (isError)
    return (
      <div className="h-screen bg-black py-14 text-white">
        Error loading movieOrTv. Please try again later.
      </div>
    );

  return (
    <div className="relative max-h-screen w-full overflow-hidden">
      {isLoading || !isImageLoaded ? (
        <div className="flex h-screen basis-full items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <img src={imageUrl} alt="cover image " className="w-full" />

          <div className="absolute left-4 top-12 w-full overflow-x-hidden p-4 text-white min-[500px]:top-16 small:top-[20%] md:left-8 lg:top-[15%]">
            <h1 className="w-auto max-w-[90%] truncate text-2xl font-bold min-[520px]:text-3xl min-[600px]:text-4xl md:text-[2.35rem] lg:text-[2.5rem]">
              {movieOrTv?.title || movieOrTv?.name}
            </h1>

            <p className="mt-2 w-[300px] text-xs min-[500px]:text-sm min-[600px]:mt-3 min-[600px]:w-[400px] min-[600px]:text-base small:mt-5 small:w-4/6 small:text-lg min-[900px]:w-3/4 lg:mt-8 lg:text-xl">
              {movieOrTv?.overview
                ? reduceLengthString(movieOrTv.overview, 130)
                : 'No overview available'}
            </p>

            <div className="flex gap-4 pt-3 text-base min-[500px]:pb-4 min-[600px]:text-base small:pt-6 small:text-lg min-[900px]:gap-8 lg:pt-8">
              <Button>Play</Button>
              <Button
                onClick={() => navigate(`/${mediaType}/${movieOrTv?.id}`)}
              >
                More info
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RandomMovieImageCover;
