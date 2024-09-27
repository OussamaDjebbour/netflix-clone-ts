import { FC } from 'react';
import { Movie } from '../features/SlidersContainer';

interface MovieProps {
  movie: Movie;
  currentIndex: number;
}

const MovieSlider: FC<MovieProps> = ({ movie, currentIndex }) => {
  // console.log(
  //   'moviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemovie',
  //   `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
  // );
  return (
    <div
      key={movie.id}
      // justify-self-center
      // className={`w-full flex-shrink-0`}
      className={`group/{currentIndex} flex-shrink-0 grow-0 basis-full min-[600px]:basis-[calc(50%-2px)] min-[768px]:basis-[calc(25%-3px)] lg:basis-[calc(20%-3.2px)]`}
      // className={`w-full flex-shrink-0 min-[600px]:w-1/2 min-[768px]:w-1/4 lg:w-1/5`}
      // style={
      //   {
      //     // transform: `translateX(-${currentIndex * 100}%)`,
      //     // transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 2}px))`,
      //     // transform: `translateX(calc(-${currentIndex * 100}% + ${currentIndex * 4}px))`,
      //   }
      // }
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={movie.title}
        // className="object-contain"
        className="w-full object-contain"
        // className="w-full object-contain min-[600px]:w-1/2"
      />
    </div>
  );
};

export default MovieSlider;
