import { FC, Suspense, useRef, useState } from 'react';
import RoundedButton from './RoundedButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPlus,
  faChevronDown,
  faCircleInfo,
  faInfo,
} from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import MovieGenres from './MovieGenres';
// import M from './M';
import MovieTrailer from './MovieTrailer';
import Spinner from './Spinner';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Movie } from '../../types/movieOrTv';
import { useMediaContext } from '../../context/useMediaContext';
import { useNavigate } from 'react-router-dom';

interface MovieProps {
  movie: Movie;
}

const MovieSlider: FC<MovieProps> = ({ movie }) => {
  const [isVideo, setIsVideo] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { mediaType } = useMediaContext();
  const navigate = useNavigate();
  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsVideo(true);
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsVideo(false);
  };

  // Check for image paths
  const imagePath = movie.backdrop_path || movie.poster_path;

  const imageUrl = `https://image.tmdb.org/t/p/w500${imagePath}`;

  // Determine aspect ratio: 16/9
  const aspectRatioClass = 'aspect-[16/9]';

  return (
    // <ErrorBoundary FallbackComponent={ErrorFallback}>
    <div
      key={movie.id}
      className="relative flex-shrink-0 grow-0 basis-full min-[600px]:basis-[calc(50%-2px)] min-[680px]:basis-[calc(33.33%-2.66px)] min-[900px]:basis-[calc(25%-3px)] lg:basis-[calc(20%-3.2px)]"
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
    >
      {/* Image or Video container with hover group */}
      <div className="group relative transform transition-transform duration-300 hover:z-50 hover:-translate-y-10 hover:scale-110 min-[600px]:hover:scale-125">
        {/* Movie Image or Video */}
        {isVideo ? (
          <div className="basis-full rounded bg-black object-cover">
            <QueryErrorResetBoundary>
              <Suspense
                fallback={<Spinner />}
                // fallback={<p className="text-center text-white">Loading...</p>}
              >
                <MovieTrailer movieId={movie.id} />
              </Suspense>
            </QueryErrorResetBoundary>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={movie.title}
            className={` ${aspectRatioClass} h-full w-full cursor-pointer rounded object-cover`}
          />
        )}

        {/* Overlay content */}
        <div className="pointer-events-none absolute left-0 top-full w-full transform bg-[#242424] px-2.5 py-2.5 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:z-50 group-hover:opacity-100">
          <div className="mb-2.5 flex justify-between">
            {/* Action Buttons */}
            <div className="flex gap-2">
              <RoundedButton>
                <FontAwesomeIcon icon={faPlay} size="xs" />
              </RoundedButton>
              <RoundedButton>
                <FontAwesomeIcon icon={faPlus} size="xs" />
              </RoundedButton>
              <RoundedButton>
                <FontAwesomeIcon icon={faThumbsUp} size="xs" />
              </RoundedButton>
              <RoundedButton>
                <FontAwesomeIcon icon={faThumbsDown} size="xs" />
              </RoundedButton>
            </div>

            {/* Expand Button */}
            {/* <RoundedButton>
              <FontAwesomeIcon icon={faChevronDown} size="xs" />
            </RoundedButton> */}

            <RoundedButton
              onClick={() => navigate(`/${mediaType}/${movie?.id}`)}
            >
              <FontAwesomeIcon icon={faInfo} size="xs" />
            </RoundedButton>
          </div>

          {/* Recommendation Score */}
          <p className="mb-0.5 text-xs font-bold text-[#46d369]">
            Recommended for {(movie.vote_average * 10).toFixed(2)}%
          </p>

          {/* Movie Genres */}
          <MovieGenres movieId={movie.id} />
        </div>
      </div>
    </div>
    // </ErrorBoundary>
  );
};

export default MovieSlider;
