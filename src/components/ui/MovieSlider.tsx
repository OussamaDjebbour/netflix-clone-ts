// import { FC } from 'react';
// import { Movie } from './SlidersContainer';
// import RoundedButton from './RoundedButton';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import { faThumbsUp } from '@fortawesome/free-regular-svg-icons/faThumbsUp';
// import { faThumbsDown } from '@fortawesome/free-regular-svg-icons';
// import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
// import MovieGenres from './MovieGenres';

// interface MovieProps {
//   movie: Movie;
//   currentIndex: number;
// }

// const MovieSlider: FC<MovieProps> = ({ movie, currentIndex }) => {
//   console.log(
//     'moviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemoviemovie',
//     movie,
//   );
//   return (
//     <div
//       key={movie.id}
//       // hover:z-50 hover:scale-150
//       className={`group relative flex-shrink-0 grow-0 basis-full cursor-pointer hover:z-50 hover:scale-125 min-[600px]:basis-[calc(50%-2px)] min-[768px]:basis-[calc(25%-3px)] lg:basis-[calc(20%-3.2px)]`}
//       // className={`group flex-shrink-0 grow-0 basis-full cursor-pointer hover:z-[1000] hover:scale-150 min-[600px]:basis-[calc(50%-2px)] min-[768px]:basis-[calc(25%-3px)] lg:basis-[calc(20%-3.2px)]`}
//     >
//       <img
//         src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
//         alt={movie.title}
//         // className="w-full rounded object-contain"
//         className="w-full transform object-contain transition-transform duration-300"
//       />
//       <div
//         // className="w-full rounded-bl rounded-br bg-[#242424] px-2.5 py-2.5"
//         // group-hover:z-[1000000] group-hover:scale-105
//         className="absolute -bottom-20 left-0 w-full transform bg-[#242424] px-2.5 py-2.5 opacity-0 transition-transform duration-300 group-hover:opacity-100"
//       >
//         {/* <div className="hidden w-full rounded-bl rounded-br bg-[#242424] px-4 py-3 group-hover:block"> */}
//         <div className="mb-2.5 flex justify-between">
//           <div className="flex gap-2">
//             <RoundedButton>
//               {<FontAwesomeIcon icon={faPlay} size="xs" />}
//             </RoundedButton>
//             <RoundedButton>
//               {<FontAwesomeIcon icon={faPlus} fontStyle="bold" size="xs" />}
//             </RoundedButton>
//             <RoundedButton>
//               {<FontAwesomeIcon icon={faThumbsUp} size="xs" />}
//             </RoundedButton>
//             <RoundedButton>
//               {<FontAwesomeIcon icon={faThumbsDown} size="xs" />}
//             </RoundedButton>
//           </div>
//           <RoundedButton>
//             {<FontAwesomeIcon icon={faChevronDown} size="xs" />}
//           </RoundedButton>
//         </div>
//         <p className="mb-0.5 text-xs font-bold text-[#46d369]">
//           Recommended for {(movie.vote_average * 10).toFixed(2)}%
//         </p>
//         <MovieGenres movieId={movie.id} />
//       </div>
//     </div>
//   );
// };

// export default MovieSlider;

// 22222222222222222222222

// import { FC } from 'react';
// import { Movie } from './SlidersContainer';
// import RoundedButton from './RoundedButton';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faPlay,
//   faPlus,
//   faChevronDown,
// } from '@fortawesome/free-solid-svg-icons';
// import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
// import MovieGenres from './MovieGenres';

// interface MovieProps {
//   movie: Movie;
//   currentIndex: number;
// }

// const MovieSlider: FC<MovieProps> = ({ movie, currentIndex }) => {
//   return (
//     <div
//       key={movie.id}
//       className={`group relative flex-shrink-0 grow-0 basis-full cursor-pointer transition-transform duration-300 hover:z-10 hover:scale-105 min-[600px]:basis-[calc(50%-2px)] min-[768px]:basis-[calc(25%-3px)] lg:basis-[calc(20%-3.2px)]`}
//     >
//       {/* Movie Image */}
//       <img
//         src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
//         alt={movie.title}
//         className="h-full w-full transform rounded object-cover transition-transform duration-300 group-hover:scale-110"
//       />

//       {/* Overlay Content */}
//       <div className="absolute bottom-0 left-0 w-full transform bg-[#242424] px-2.5 py-2.5 opacity-0 transition-all duration-300 group-hover:-translate-y-4 group-hover:opacity-100">
//         <div className="mb-2.5 flex justify-between">
//           {/* Action Buttons */}
//           <div className="flex gap-2">
//             <RoundedButton>
//               <FontAwesomeIcon icon={faPlay} size="xs" />
//             </RoundedButton>
//             <RoundedButton>
//               <FontAwesomeIcon icon={faPlus} size="xs" />
//             </RoundedButton>
//             <RoundedButton>
//               <FontAwesomeIcon icon={faThumbsUp} size="xs" />
//             </RoundedButton>
//             <RoundedButton>
//               <FontAwesomeIcon icon={faThumbsDown} size="xs" />
//             </RoundedButton>
//           </div>

//           {/* Expand Button */}
//           <RoundedButton>
//             <FontAwesomeIcon icon={faChevronDown} size="xs" />
//           </RoundedButton>
//         </div>

//         {/* Recommendation Score */}
//         <p className="mb-0.5 text-xs font-bold text-[#46d369]">
//           Recommended for {(movie.vote_average * 10).toFixed(2)}%
//         </p>

//         {/* Movie Genres */}
//         <MovieGenres movieId={movie.id} />
//       </div>
//     </div>
//   );
// };

// export default MovieSlider;

// import { FC } from 'react';
// import { Movie } from './SlidersContainer';
// import RoundedButton from './RoundedButton';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faPlay,
//   faPlus,
//   faChevronDown,
// } from '@fortawesome/free-solid-svg-icons';
// import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
// import MovieGenres from './MovieGenres';

// interface MovieProps {
//   movie: Movie;
//   currentIndex: number;
// }

// const MovieSlider: FC<MovieProps> = ({ movie, currentIndex }) => {
//   return (
//     <div
//       key={movie.id}
//       className={`group relative flex-shrink-0 grow-0 basis-full cursor-pointer transition-transform duration-300 hover:z-10 hover:scale-105 min-[600px]:basis-[calc(50%-2px)] min-[768px]:basis-[calc(25%-3px)] lg:basis-[calc(20%-3.2px)]`}
//     >
//       {/* Movie Image */}
//       <img
//         src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
//         alt={movie.title}
//         className="w-full transform rounded object-contain transition-transform duration-300 group-hover:scale-110"
//       />

//       {/* Overlay Content Below the Image */}
//       <div className="relative w-full transform bg-[#242424] px-2.5 py-2.5 opacity-0 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100">
//         <div className="mb-2.5 flex justify-between">
//           {/* Action Buttons */}
//           <div className="flex gap-2">
//             <RoundedButton>
//               <FontAwesomeIcon icon={faPlay} size="xs" />
//             </RoundedButton>
//             <RoundedButton>
//               <FontAwesomeIcon icon={faPlus} size="xs" />
//             </RoundedButton>
//             <RoundedButton>
//               <FontAwesomeIcon icon={faThumbsUp} size="xs" />
//             </RoundedButton>
//             <RoundedButton>
//               <FontAwesomeIcon icon={faThumbsDown} size="xs" />
//             </RoundedButton>
//           </div>

//           {/* Expand Button */}
//           <RoundedButton>
//             <FontAwesomeIcon icon={faChevronDown} size="xs" />
//           </RoundedButton>
//         </div>

//         {/* Recommendation Score */}
//         <p className="mb-0.5 text-xs font-bold text-[#46d369]">
//           Recommended for {(movie.vote_average * 10).toFixed(2)}%
//         </p>

//         {/* Movie Genres */}
//         <MovieGenres movieId={movie.id} />
//       </div>
//     </div>
//   );
// };

// export default MovieSlider;

// 444444

// import { FC } from 'react';
// import { Movie } from './SlidersContainer';
// import RoundedButton from './RoundedButton';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faPlay,
//   faPlus,
//   faChevronDown,
// } from '@fortawesome/free-solid-svg-icons';
// import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
// import MovieGenres from './MovieGenres';

// interface MovieProps {
//   movie: Movie;
//   currentIndex: number;
// }

// const MovieSlider: FC<MovieProps> = ({ movie, currentIndex }) => {
//   return (
//     <div
//       key={movie.id}
//       className={`group relative flex-shrink-0 grow-0 basis-full cursor-pointer transition-transform duration-300 hover:z-10 hover:-translate-y-10 min-[600px]:basis-[calc(50%-2px)] min-[768px]:basis-[calc(25%-3px)] lg:basis-[calc(20%-3.2px)]`}
//       // className={`group relative flex-shrink-0 grow-0 basis-full cursor-pointer transition-transform duration-300 hover:z-10 hover:-translate-y-10 hover:scale-110 min-[600px]:basis-[calc(50%-2px)] min-[600px]:hover:scale-125 min-[768px]:basis-[calc(25%-3px)] lg:basis-[calc(20%-3.2px)]`}
//     >
//       {/* Image container */}
//       <div className="relative">
//         {/* Movie Image */}
//         <img
//           src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
//           alt={movie.title}
//           className="h-full w-full transform rounded object-cover transition-transform duration-300 group-hover:scale-110 min-[600px]:group-hover:scale-125"
//           // className="h-full w-full transform rounded object-cover transition-transform duration-300"
//         />
//       </div>

//       {/* Overlay content */}
//       <div className="absolute left-0 top-full z-auto w-full transform bg-[#242424] px-2.5 py-2.5 opacity-0 transition-all duration-300 group-hover:scale-150 group-hover:translate-y-20 group-hover:opacity-100">
//         {/* <div className="absolute left-0 top-full z-auto w-full transform bg-[#242424] px-2.5 py-2.5 opacity-0 transition-all duration-300 group-hover:opacity-100"> */}
//         <div className="mb-2.5 flex justify-between">
//           {/* Action Buttons */}
//           <div className="flex gap-2">
//             <RoundedButton>
//               <FontAwesomeIcon icon={faPlay} size="xs" />
//             </RoundedButton>
//             <RoundedButton>
//               <FontAwesomeIcon icon={faPlus} size="xs" />
//             </RoundedButton>
//             <RoundedButton>
//               <FontAwesomeIcon icon={faThumbsUp} size="xs" />
//             </RoundedButton>
//             <RoundedButton>
//               <FontAwesomeIcon icon={faThumbsDown} size="xs" />
//             </RoundedButton>
//           </div>

//           {/* Expand Button */}
//           <RoundedButton>
//             <FontAwesomeIcon icon={faChevronDown} size="xs" />
//           </RoundedButton>
//         </div>

//         {/* Recommendation Score */}
//         <p className="mb-0.5 text-xs font-bold text-[#46d369]">
//           Recommended for {(movie.vote_average * 10).toFixed(2)}%
//         </p>

//         {/* Movie Genres */}
//         <MovieGenres movieId={movie.id} />
//       </div>
//     </div>
//   );
// };

// export default MovieSlider;

// 555555555555555555555555

// import { FC } from 'react';
// import { Movie } from './SlidersContainer';
// import RoundedButton from './RoundedButton';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faPlay,
//   faPlus,
//   faChevronDown,
// } from '@fortawesome/free-solid-svg-icons';
// import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
// import MovieGenres from './MovieGenres';

// interface MovieProps {
//   movie: Movie;
//   currentIndex: number;
// }

// const MovieSlider: FC<MovieProps> = ({ movie, currentIndex }) => {
//   return (
//     <div
//       key={movie.id}
//       className={`group relative flex-shrink-0 grow-0 basis-full cursor-pointer transition-transform duration-300 hover:z-10 hover:scale-105 min-[600px]:basis-[calc(50%-2px)] min-[768px]:basis-[calc(25%-3px)] lg:basis-[calc(20%-3.2px)]`}
//     >
//       {/* Image container */}
//       <div className="relative">
//         {/* Movie Image */}
//         <img
//           src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
//           alt={movie.title}
//           className="h-full w-full transform rounded object-cover transition-transform duration-300 group-hover:scale-110"
//         />
//       </div>

//       {/* Overlay content */}
//       <div className="absolute left-0 top-full w-full transform bg-[#242424] px-2.5 py-2.5 opacity-0 transition-all duration-300 group-hover:opacity-100">
//         <div className="mb-2.5 flex justify-between">
//           {/* Action Buttons */}
//           <div className="flex gap-2">
//             <RoundedButton>
//               <FontAwesomeIcon icon={faPlay} size="xs" />
//             </RoundedButton>
//             <RoundedButton>
//               <FontAwesomeIcon icon={faPlus} size="xs" />
//             </RoundedButton>
//             <RoundedButton>
//               <FontAwesomeIcon icon={faThumbsUp} size="xs" />
//             </RoundedButton>
//             <RoundedButton>
//               <FontAwesomeIcon icon={faThumbsDown} size="xs" />
//             </RoundedButton>
//           </div>

//           {/* Expand Button */}
//           <RoundedButton>
//             <FontAwesomeIcon icon={faChevronDown} size="xs" />
//           </RoundedButton>
//         </div>

//         {/* Recommendation Score */}
//         <p className="mb-0.5 text-xs font-bold text-[#46d369]">
//           Recommended for {(movie.vote_average * 10).toFixed(2)}%
//         </p>

//         {/* Movie Genres */}
//         <MovieGenres movieId={movie.id} />
//       </div>
//     </div>
//   );
// };

// export default MovieSlider;

// 6666666666666666666666666666666

// import { FC } from 'react';
// import { Movie } from './SlidersContainer';
// import RoundedButton from './RoundedButton';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faPlay,
//   faPlus,
//   faChevronDown,
// } from '@fortawesome/free-solid-svg-icons';
// import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
// import MovieGenres from './MovieGenres';

// interface MovieProps {
//   movie: Movie;
//   currentIndex: number;
// }

// const MovieSlider: FC<MovieProps> = ({ movie, currentIndex }) => {
//   return (
//     <div
//       key={movie.id}
//       className="relative flex-shrink-0 grow-0 basis-full cursor-pointer min-[600px]:basis-[calc(50%-2px)] min-[680px]:basis-[calc(33.33%-2.66px)] min-[900px]:basis-[calc(25%-3px)] lg:basis-[calc(20%-3.2px)]"
//     >
//       {/* Image container with hover group */}
//       <div className="group relative transform transition-transform duration-300 hover:z-50 hover:-translate-y-10 hover:scale-110 min-[600px]:hover:scale-125">
//         {/* Movie Image */}
//         <img
//           src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
//           alt={movie.title}
//           // transform transition-transform duration-300
//           // group-hover:scale-110 min-[600px]:group-hover:scale-125
//           className="h-full w-full rounded object-cover"
//         />

//         {/* Overlay content */}
//         <div className="pointer-events-none absolute left-0 top-full w-full transform bg-[#242424] px-2.5 py-2.5 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:z-50 group-hover:opacity-100">
//           <div className="mb-2.5 flex justify-between">
//             {/* Action Buttons */}
//             <div className="flex gap-2">
//               <RoundedButton>
//                 <FontAwesomeIcon icon={faPlay} size="xs" />
//               </RoundedButton>
//               <RoundedButton>
//                 <FontAwesomeIcon icon={faPlus} size="xs" />
//               </RoundedButton>
//               <RoundedButton>
//                 <FontAwesomeIcon icon={faThumbsUp} size="xs" />
//               </RoundedButton>
//               <RoundedButton>
//                 <FontAwesomeIcon icon={faThumbsDown} size="xs" />
//               </RoundedButton>
//             </div>

//             {/* Expand Button */}
//             <RoundedButton>
//               <FontAwesomeIcon icon={faChevronDown} size="xs" />
//             </RoundedButton>
//           </div>

//           {/* Recommendation Score */}
//           <p className="mb-0.5 text-xs font-bold text-[#46d369]">
//             Recommended for {(movie.vote_average * 10).toFixed(2)}%
//           </p>

//           {/* Movie Genres */}
//           <MovieGenres movieId={movie.id} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieSlider;

// 8888888888888888888888888888

import { FC, Suspense, useRef, useState } from 'react';
import { Movie } from '../features/SlidersContainer';
import RoundedButton from './RoundedButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPlus,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import MovieGenres from './MovieGenres';
import M from './M';
import MovieTrailer from './MovieTrailer';

interface MovieProps {
  movie: Movie;
  currentIndex: number;
}

const MovieSlider: FC<MovieProps> = ({ movie, currentIndex }) => {
  // const [isHovered, setIsHovered] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const hoverTimeoutRef = useRef<number | null>(null);
  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsVideo(true);
    }, 1000); // 3 seconds
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsVideo(false);
  };

  return (
    <div
      key={movie.id}
      className="relative flex-shrink-0 grow-0 basis-full cursor-pointer min-[600px]:basis-[calc(50%-2px)] min-[768px]:basis-[calc(25%-3px)] lg:basis-[calc(20%-3.2px)]"
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
    >
      {/* Image or Video container with hover group */}
      <div className="group relative transform transition-transform duration-300 hover:z-50 hover:-translate-y-10 hover:scale-125">
        {/* Movie Image or Video */}
        {isVideo ? (
          <Suspense
            fallback={<p className="text-center text-white">Loading...</p>}
          >
            <MovieTrailer movieId={movie.id} />
          </Suspense>
        ) : (
          // <video
          //   src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} // You will need the video source from TMDb or other sources
          //   className="h-full w-full rounded object-cover"
          //   autoPlay
          //   muted
          //   loop
          // />
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
            className="h-full w-full rounded object-cover"
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
            <RoundedButton>
              <FontAwesomeIcon icon={faChevronDown} size="xs" />
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
  );
};

export default MovieSlider;
