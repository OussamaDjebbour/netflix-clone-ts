import { FC } from 'react';
import { Movie } from './SlidersContainer';
import RoundedButton from './RoundedButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons/faThumbsUp';
import { faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import MovieGenres from './MovieGenres';

interface MovieProps {
  movie: Movie;
  currentIndex: number;
}

const MovieSlider: FC<MovieProps> = ({ movie, currentIndex }) => {
  console.log(
    'moviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemovie',
    movie,
  );
  return (
    <div
      key={movie.id}
      // className={`flex-shrink-0 grow-0 basis-full cursor-pointer hover:z-[1000] min-[600px]:basis-[calc(50%-2px)] min-[768px]:basis-[calc(25%-3px)] lg:basis-[calc(20%-3.2px)]`}
      className={`group flex-shrink-0 grow-0 basis-full cursor-pointer hover:z-[1000] hover:scale-150 min-[600px]:basis-[calc(50%-2px)] min-[768px]:basis-[calc(25%-3px)] lg:basis-[calc(20%-3.2px)]`}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={movie.title}
        className="w-full rounded object-contain"
      />
      <div className="w-full rounded-bl rounded-br bg-[#242424] px-2.5 py-2.5">
        {/* <div className="hidden w-full rounded-bl rounded-br bg-[#242424] px-4 py-3 group-hover:block"> */}
        <div className="mb-2.5 flex justify-between">
          <div className="flex gap-2">
            {/* <RoundedButton icon="https://cdn.prod.website-files.com/5fa150c7bde6f84e780b1c4e/5fa2bc111ad1fe37dab1b19f_icon_play_black.svg" /> */}
            <RoundedButton>
              {<FontAwesomeIcon icon={faPlay} size="xs" />}
            </RoundedButton>
            <RoundedButton>
              {<FontAwesomeIcon icon={faPlus} fontStyle="bold" size="xs" />}
            </RoundedButton>
            <RoundedButton>
              {<FontAwesomeIcon icon={faThumbsUp} size="xs" />}
            </RoundedButton>
            <RoundedButton>
              {<FontAwesomeIcon icon={faThumbsDown} size="xs" />}
            </RoundedButton>

            {/* </RoundedButton> */}
          </div>
          <RoundedButton>
            {<FontAwesomeIcon icon={faChevronDown} size="xs" />}
          </RoundedButton>
        </div>
        <p className="mb-0.5 text-xs font-bold text-[#46d369]">
          Recommended for {(movie.vote_average * 10).toFixed(2)}%
        </p>
        <MovieGenres movieId={movie.id} />
      </div>
    </div>
  );
};

export default MovieSlider;
