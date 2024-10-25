// import { FC, useEffect, useState } from 'react';
// import { useInfiniteQuery } from '@tanstack/react-query';
// import { fetchTVShows } from '../../services/fetchTVShows';
// import { useMediaQuery } from 'react-responsive';
// import Spinner from './Spinner';
// import MovieSlider from './MovieSlider';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faChevronLeft,
//   faChevronRight,
// } from '@fortawesome/free-solid-svg-icons';
// import { PERCENTAGE_TRANSFORM } from '../../constants';

// interface SliderProps {
//   title: string;
// }

// const RowTest: FC<SliderProps> = ({ title }) => {
//   const [moviesPerPage, setMoviesPerPage] = useState(1);

//   const isVerySmallScreen = useMediaQuery({ query: '(max-width: 599px)' });
//   const isSmallScreen = useMediaQuery({
//     query: '(min-width: 600px) and (max-width: 679px)',
//   });
//   const isMediumScreen = useMediaQuery({
//     query: '(min-width: 680px) and (max-width: 899px)',
//   });
//   const isLargeScreen = useMediaQuery({
//     query: '(min-width: 900px) and (max-width: 1023px)',
//   });
//   const isVeryLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

//   useEffect(() => {
//     if (isVerySmallScreen) {
//       setMoviesPerPage(1);
//     } else if (isSmallScreen) {
//       setMoviesPerPage(2);
//     } else if (isMediumScreen) {
//       setMoviesPerPage(3);
//     } else if (isLargeScreen) {
//       setMoviesPerPage(4);
//     } else if (isVeryLargeScreen) {
//       setMoviesPerPage(5);
//     }
//   }, [
//     isVerySmallScreen,
//     isSmallScreen,
//     isMediumScreen,
//     isLargeScreen,
//     isVeryLargeScreen,
//   ]);

//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
//     useInfiniteQuery({
//       queryKey: ['movies', title, moviesPerPage],
//       queryFn: ({ pageParam = 1 }) => fetchTVShows(title, 'movies', pageParam),
//       getNextPageParam: (lastPage, allPages) =>
//         lastPage.length ? allPages.length + 1 : undefined,
//       initialPageParam: 1,
//     });
//   // useInfiniteQuery({
//   //   queryKey: ['movies', title],
//   //   queryFn: ({ pageParam = 1 }) => fetchTVShows(title, 'movies', pageParam),
//   //   {
//   //     getNextPageParam: (lastPage, allPages) =>
//   //       lastPage.length ? allPages.length + 1 : undefined,
//   //   },
//   // });

//   const movies = data?.pages.flat() || [];
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const prevSlide = () => {
//     setCurrentIndex((prev) =>
//       prev === 0 ? movies.length - moviesPerPage : prev - moviesPerPage,
//     );
//   };

//   const nextSlide = () => {
//     if (currentIndex + moviesPerPage >= movies.length && hasNextPage) {
//       fetchNextPage();
//     }
//     setCurrentIndex((prev) =>
//       prev + moviesPerPage >= movies.length ? 0 : prev + moviesPerPage,
//     );
//   };

//   const styles = {
//     transform: isVerySmallScreen
//       ? `translateX(calc(-${currentIndex * PERCENTAGE_TRANSFORM}% + ${currentIndex * 68}px))`
//       : isSmallScreen || isMediumScreen || isLargeScreen || isVeryLargeScreen
//         ? `translateX(calc(-${currentIndex * PERCENTAGE_TRANSFORM}% + ${currentIndex * 108}px))`
//         : '',
//   };

//   //   const styles = {
//   //     transform: `translateX(calc(-${(currentIndex * 100) / moviesPerPage}%))`,
//   //   };

//   return (
//     <div className="relative">
//       {isFetchingNextPage ? (
//         <Spinner />
//       ) : (
//         <div
//           className="flex basis-full gap-1 px-9 transition-transform duration-500 min-[600px]:px-14"
//           style={styles}
//         >
//           {movies
//             .slice(currentIndex, currentIndex + moviesPerPage)
//             .map((movie) => (
//               <MovieSlider
//                 key={movie.id}
//                 movie={movie}
//                 currentIndex={currentIndex}
//               />
//             ))}
//         </div>
//       )}

//       <button
//         onClick={prevSlide}
//         className="absolute left-0 top-1/2 h-full w-[35px] -translate-y-1/2 transform bg-[rgba(0,0,0,0.5)] min-[600px]:w-[55px]"
//       >
//         <FontAwesomeIcon
//           icon={faChevronLeft}
//           size="3x"
//           color="white"
//           fontWeight="bold"
//         />
//       </button>

//       <button
//         onClick={nextSlide}
//         className="absolute right-0 top-1/2 h-full w-[35px] -translate-y-1/2 transform bg-[rgba(0,0,0,0.5)] min-[600px]:w-[55px]"
//       >
//         <FontAwesomeIcon
//           icon={faChevronRight}
//           size="3x"
//           color="white"
//           fontWeight="bold"
//         />
//       </button>
//     </div>
//   );
// };

// export default RowTest;

// import { FC, useEffect, useState } from 'react';
// import { useInfiniteQuery } from '@tanstack/react-query';
// import { fetchTVShows } from '../../services/fetchTVShows';
// import { useMediaQuery } from 'react-responsive';
// import Spinner from './Spinner';
// import MovieSlider from './MovieSlider';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faChevronLeft,
//   faChevronRight,
// } from '@fortawesome/free-solid-svg-icons';
// import { PERCENTAGE_TRANSFORM } from '../../constants';

// interface SliderProps {
//   title: string;
// }

// const RowTest: FC<SliderProps> = ({ title }) => {
//   const [moviesPerPage, setMoviesPerPage] = useState(1);

//   const isVerySmallScreen = useMediaQuery({ query: '(max-width: 599px)' });
//   const isSmallScreen = useMediaQuery({
//     query: '(min-width: 600px) and (max-width: 679px)',
//   });
//   const isMediumScreen = useMediaQuery({
//     query: '(min-width: 680px) and (max-width: 899px)',
//   });
//   const isLargeScreen = useMediaQuery({
//     query: '(min-width: 900px) and (max-width: 1023px)',
//   });
//   const isVeryLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

//   useEffect(() => {
//     if (isVerySmallScreen) {
//       setMoviesPerPage(1);
//     } else if (isSmallScreen) {
//       setMoviesPerPage(2);
//     } else if (isMediumScreen) {
//       setMoviesPerPage(3);
//     } else if (isLargeScreen) {
//       setMoviesPerPage(4);
//     } else if (isVeryLargeScreen) {
//       setMoviesPerPage(5);
//     }
//   }, [
//     isVerySmallScreen,
//     isSmallScreen,
//     isMediumScreen,
//     isLargeScreen,
//     isVeryLargeScreen,
//   ]);

//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
//     useInfiniteQuery({
//       queryKey: ['movies', title, moviesPerPage],
//       queryFn: ({ pageParam = 1 }) => fetchTVShows(title, 'movies', pageParam),
//       getNextPageParam: (lastPage, allPages) =>
//         lastPage.length ? allPages.length + 1 : undefined,
//       initialPageParam: 1,
//     });

//   const movies = data?.pages.flat() || [];
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const prevSlide = () => {
//     setCurrentIndex((prev) =>
//       prev === 0 ? movies.length - moviesPerPage : prev - moviesPerPage,
//     );
//   };

//   const nextSlide = () => {
//     if (currentIndex + moviesPerPage >= movies.length && hasNextPage) {
//       fetchNextPage();
//     }
//     setCurrentIndex((prev) =>
//       prev + moviesPerPage >= movies.length ? 0 : prev + moviesPerPage,
//     );
//   };

//   const styles = {
//     transform: isVerySmallScreen
//       ? `translateX(calc(-${currentIndex * PERCENTAGE_TRANSFORM}% + ${currentIndex * 68}px))`
//       : `translateX(calc(-${currentIndex * PERCENTAGE_TRANSFORM}% + ${currentIndex * 108}px))`,
//   };

//   return (
//     <div className="relative">
//       {isFetchingNextPage ? (
//         <Spinner />
//       ) : (
//         <div
//           className="flex basis-full gap-1 px-9 transition-transform duration-500 min-[600px]:px-14"
//           //   style={styles}
//         >
//           {movies
//             .slice(currentIndex, currentIndex + moviesPerPage)
//             .map((movie) => (
//               <MovieSlider
//                 key={movie.id}
//                 movie={movie}
//                 currentIndex={currentIndex}
//               />
//             ))}
//         </div>
//       )}

//       <button
//         onClick={prevSlide}
//         className="absolute left-0 top-1/2 h-full w-[35px] -translate-y-1/2 transform bg-[rgba(0,0,0,0.5)] min-[600px]:w-[55px]"
//       >
//         <FontAwesomeIcon
//           icon={faChevronLeft}
//           size="3x"
//           color="white"
//           fontWeight="bold"
//         />
//       </button>

//       <button
//         onClick={nextSlide}
//         className="absolute right-0 top-1/2 h-full w-[35px] -translate-y-1/2 transform bg-[rgba(0,0,0,0.5)] min-[600px]:w-[55px]"
//       >
//         <FontAwesomeIcon
//           icon={faChevronRight}
//           size="3x"
//           color="white"
//           fontWeight="bold"
//         />
//       </button>
//     </div>
//   );
// };

// export default RowTest;

// import { FC, useEffect, useState } from 'react';
// import { useInfiniteQuery } from '@tanstack/react-query';
// import { fetchTVShows } from '../../services/fetchTVShows';
// import { useMediaQuery } from 'react-responsive';
// import Spinner from './Spinner';
// import MovieSlider from './MovieSlider';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faChevronLeft,
//   faChevronRight,
// } from '@fortawesome/free-solid-svg-icons';
// import { PERCENTAGE_TRANSFORM } from '../../constants';

// interface SliderProps {
//   title: string;
// }

// const RowTest: FC<SliderProps> = ({ title }) => {
//   const [moviesPerPage, setMoviesPerPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);

//   const isVerySmallScreen = useMediaQuery({ query: '(max-width: 599px)' });
//   const isSmallScreen = useMediaQuery({
//     query: '(min-width: 600px) and (max-width: 679px)',
//   });
//   const isMediumScreen = useMediaQuery({
//     query: '(min-width: 680px) and (max-width: 899px)',
//   });
//   const isLargeScreen = useMediaQuery({
//     query: '(min-width: 900px) and (max-width: 1023px)',
//   });
//   const isVeryLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

//   useEffect(() => {
//     if (isVerySmallScreen) {
//       setMoviesPerPage(1);
//     } else if (isSmallScreen) {
//       setMoviesPerPage(2);
//     } else if (isMediumScreen) {
//       setMoviesPerPage(3);
//     } else if (isLargeScreen) {
//       setMoviesPerPage(4);
//     } else if (isVeryLargeScreen) {
//       setMoviesPerPage(5);
//     }
//   }, [
//     isVerySmallScreen,
//     isSmallScreen,
//     isMediumScreen,
//     isLargeScreen,
//     isVeryLargeScreen,
//   ]);

//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
//     useInfiniteQuery({
//       queryKey: ['movies', title, moviesPerPage],
//       queryFn: ({ pageParam = 1 }) => fetchTVShows(title, 'movies', pageParam),
//       getNextPageParam: (lastPage, allPages) =>
//         lastPage.length ? allPages.length + 1 : undefined,
//       initialPageParam: 1,
//     });

//   const movies = data?.pages.flat() || [];
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const prevSlide = () => {
//     setCurrentIndex((prev) =>
//       prev === 0 ? movies.length - moviesPerPage : prev - moviesPerPage,
//     );
//   };

//   const nextSlide = () => {
//     if (currentIndex + moviesPerPage >= movies.length && hasNextPage) {
//       setIsLoading(true);
//       fetchNextPage().then(() => setIsLoading(false));
//     }
//     setCurrentIndex((prev) =>
//       prev + moviesPerPage >= movies.length ? 0 : prev + moviesPerPage,
//     );
//   };

//   const styles = {
//     transform: `translateX(calc(-${currentIndex * PERCENTAGE_TRANSFORM}%))`,
//     transition: 'transform 0.5s ease-in-out', // Smooth transition
//   };

//   return (
//     <div className="relative">
//       {isFetchingNextPage || isLoading ? (
//         <Spinner />
//       ) : (
//         <div
//           className="flex basis-full gap-1 px-9 transition-transform duration-500 ease-in-out min-[600px]:px-14"
//           //   style={styles}
//         >
//           {movies
//             .slice(currentIndex, currentIndex + moviesPerPage)
//             .map((movie) => (
//               <MovieSlider
//                 key={movie.id}
//                 movie={movie}
//                 currentIndex={currentIndex}
//               />
//             ))}
//         </div>
//       )}

//       <button
//         onClick={prevSlide}
//         className="absolute left-0 top-1/2 h-full w-[35px] -translate-y-1/2 transform bg-[rgba(0,0,0,0.5)] min-[600px]:w-[55px]"
//       >
//         <FontAwesomeIcon
//           icon={faChevronLeft}
//           size="3x"
//           color="white"
//           fontWeight="bold"
//         />
//       </button>

//       <button
//         onClick={nextSlide}
//         className="absolute right-0 top-1/2 h-full w-[35px] -translate-y-1/2 transform bg-[rgba(0,0,0,0.5)] min-[600px]:w-[55px]"
//       >
//         <FontAwesomeIcon
//           icon={faChevronRight}
//           size="3x"
//           color="white"
//           fontWeight="bold"
//         />
//       </button>
//     </div>
//   );
// };

// export default RowTest;

// without animation

// import { FC, useEffect, useState } from 'react';
// import { useInfiniteQuery } from '@tanstack/react-query';
// import { fetchTVShows } from '../../services/fetchTVShows';
// import { useMediaQuery } from 'react-responsive';
// import Spinner from './Spinner';
// import MovieSlider from './MovieSlider';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faChevronLeft,
//   faChevronRight,
// } from '@fortawesome/free-solid-svg-icons';
// import { PERCENTAGE_TRANSFORM } from '../../constants';

// interface SliderProps {
//   title: string;
// }

// const RowTest: FC<SliderProps> = ({ title }) => {
//   const [moviesPerPage, setMoviesPerPage] = useState(1);

//   // Set up responsive breakpoints
//   const isVerySmallScreen = useMediaQuery({ query: '(max-width: 599px)' });
//   const isSmallScreen = useMediaQuery({
//     query: '(min-width: 600px) and (max-width: 679px)',
//   });
//   const isMediumScreen = useMediaQuery({
//     query: '(min-width: 680px) and (max-width: 899px)',
//   });
//   const isLargeScreen = useMediaQuery({
//     query: '(min-width: 900px) and (max-width: 1023px)',
//   });
//   const isVeryLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

//   useEffect(() => {
//     if (isVerySmallScreen) setMoviesPerPage(1);
//     else if (isSmallScreen) setMoviesPerPage(2);
//     else if (isMediumScreen) setMoviesPerPage(3);
//     else if (isLargeScreen) setMoviesPerPage(4);
//     else if (isVeryLargeScreen) setMoviesPerPage(5);
//   }, [
//     isVerySmallScreen,
//     isSmallScreen,
//     isMediumScreen,
//     isLargeScreen,
//     isVeryLargeScreen,
//   ]);

//   // Fetch data with useInfiniteQuery
//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
//     useInfiniteQuery({
//       queryKey: ['movies', title, moviesPerPage],
//       queryFn: ({ pageParam = 1 }) => fetchTVShows(title, 'movies', pageParam),
//       getNextPageParam: (lastPage, allPages) =>
//         lastPage.length ? allPages.length + 1 : undefined,
//       initialPageParam: 1,
//     });

//   console.log('isFetchingNextPageisFetchingNextPage', isFetchingNextPage);

//   const movies = data?.pages.flat() || [];
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Handle Previous and Next Slide
//   const prevSlide = () => {
//     setCurrentIndex((prev) =>
//       prev === 0 ? movies.length - moviesPerPage : prev - moviesPerPage,
//     );
//   };

//   const nextSlide = () => {
//     if (currentIndex + moviesPerPage >= movies.length && hasNextPage)
//       fetchNextPage();
//     setCurrentIndex((prev) =>
//       prev + moviesPerPage >= movies.length ? 0 : prev + moviesPerPage,
//     );
//   };

//   // Calculate transform based on screen width and index
//   const transformValue = isVerySmallScreen
//     ? `translateX(calc(-${currentIndex * PERCENTAGE_TRANSFORM}% + ${currentIndex * 68}px))`
//     : `translateX(calc(-${currentIndex * PERCENTAGE_TRANSFORM}% + ${currentIndex * 108}px))`;

//   return (
//     <div className="relative">
//       {/* Conditional Spinner */}
//       {(isFetchingNextPage || isLoading) && (
//         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <Spinner />
//         </div>
//       )}

//       <div
//         className="flex basis-full gap-1 px-9 transition-transform duration-500 ease-in-out min-[600px]:px-14"
//         // style={{ transform: transformValue }}
//       >
//         {movies
//           .slice(currentIndex, currentIndex + moviesPerPage)
//           .map((movie) => (
//             <MovieSlider
//               key={movie.id}
//               movie={movie}
//               currentIndex={currentIndex}
//             />
//           ))}
//       </div>

//       {/* Previous Button */}
//       <button
//         onClick={prevSlide}
//         className="absolute left-0 top-1/2 h-full w-[35px] -translate-y-1/2 transform bg-[rgba(0,0,0,0.5)] min-[600px]:w-[55px]"
//       >
//         <FontAwesomeIcon
//           icon={faChevronLeft}
//           size="3x"
//           color="white"
//           fontWeight="bold"
//         />
//       </button>

//       {/* Next Button */}
//       <button
//         onClick={nextSlide}
//         className="absolute right-0 top-1/2 h-full w-[35px] -translate-y-1/2 transform bg-[rgba(0,0,0,0.5)] min-[600px]:w-[55px]"
//       >
//         <FontAwesomeIcon
//           icon={faChevronRight}
//           size="3x"
//           color="white"
//           fontWeight="bold"
//         />
//       </button>
//     </div>
//   );
// };

// export default RowTest;

// With Fade-in animation

// import { FC, useEffect, useState } from 'react';
// import { useInfiniteQuery } from '@tanstack/react-query';
// import { fetchTVShows } from '../../services/fetchTVShows';
// import { useMediaQuery } from 'react-responsive';
// import Spinner from './Spinner';
// import MovieSlider from './MovieSlider';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faChevronLeft,
//   faChevronRight,
// } from '@fortawesome/free-solid-svg-icons';

// interface SliderProps {
//   title: string;
// }

// const RowTest: FC<SliderProps> = ({ title }) => {
//   const [moviesPerPage, setMoviesPerPage] = useState(1);
//   const [fade, setFade] = useState(true); // State for fade effect

//   const isVerySmallScreen = useMediaQuery({ query: '(max-width: 599px)' });
//   const isSmallScreen = useMediaQuery({
//     query: '(min-width: 600px) and (max-width: 679px)',
//   });
//   const isMediumScreen = useMediaQuery({
//     query: '(min-width: 680px) and (max-width: 899px)',
//   });
//   const isLargeScreen = useMediaQuery({
//     query: '(min-width: 900px) and (max-width: 1023px)',
//   });
//   const isVeryLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

//   useEffect(() => {
//     if (isVerySmallScreen) {
//       setMoviesPerPage(1);
//     } else if (isSmallScreen) {
//       setMoviesPerPage(2);
//     } else if (isMediumScreen) {
//       setMoviesPerPage(3);
//     } else if (isLargeScreen) {
//       setMoviesPerPage(4);
//     } else if (isVeryLargeScreen) {
//       setMoviesPerPage(5);
//     }
//   }, [
//     isVerySmallScreen,
//     isSmallScreen,
//     isMediumScreen,
//     isLargeScreen,
//     isVeryLargeScreen,
//   ]);

//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
//     useInfiniteQuery({
//       queryKey: ['movies', title, moviesPerPage],
//       queryFn: ({ pageParam = 1 }) => fetchTVShows(title, 'movies', pageParam),
//       getNextPageParam: (lastPage, allPages) => {
//         console.log(
//           'lastPage, allPages',
//           lastPage,
//           allPages,
//           lastPage.hasMore ? allPages.length + 1 : undefined,
//         );
//         return lastPage.hasMore ? allPages.length + 1 : undefined;
//       },
//       initialPageParam: 1,
//     });

//   console.log(
//     'isFetchingNextPage, isLoadingisFetchingNextPage, isLoadingisFetchingNextPage, isLoadingisFetchingNextPage, isLoading',
//     isFetchingNextPage,
//     isLoading,
//   );

//   const movies = data?.pages.flat() || [];
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const prevSlide = () => {
//     setFade(false); // Start fade out
//     setCurrentIndex((prev) =>
//       prev === 0 ? movies.length - moviesPerPage : prev - moviesPerPage,
//     );
//   };

//   const nextSlide = () => {
//     if (currentIndex + moviesPerPage >= movies.length && hasNextPage) {
//       fetchNextPage();
//     }
//     setFade(false); // Start fade out
//     setCurrentIndex((prev) =>
//       prev + moviesPerPage >= movies.length ? 0 : prev + moviesPerPage,
//     );
//   };

//   // Reset fade effect after state change
//   useEffect(() => {
//     if (!fade) {
//       const timer = setTimeout(() => setFade(true), 300); // Match duration with CSS transition
//       return () => clearTimeout(timer);
//     }
//   }, [currentIndex]);

//   return (
//     <div className="relative">
//       {isFetchingNextPage || isLoading ? (
//         <Spinner />
//       ) : (
//         // <div
//         //   className={`flex basis-full gap-1 px-9 transition-opacity duration-300 min-[600px]:px-14 ${fade ? 'opacity-100' : 'opacity-0'}`}
//         // >
//         //   {movies
//         //     .slice(currentIndex, currentIndex + moviesPerPage)
//         //     .map((movie) => (
//         //       <MovieSlider
//         //         key={movie.id}
//         //         movie={movie}
//         //         currentIndex={currentIndex}
//         //       />
//         //     ))}
//         // </div>

//         // <div
//         //   className={`flex basis-full gap-1 px-9 transition-opacity duration-500 ${fade ? 'opacity-100' : 'scale-95 opacity-0'}`}
//         // >
//         <div
//           className={`flex basis-full gap-1 px-9 transition-all duration-500 min-[600px]:px-14 ${
//             fade ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
//           }`}
//         >
//           {movies
//             .slice(currentIndex, currentIndex + moviesPerPage)
//             .map((movie) => (
//               <MovieSlider
//                 key={movie.id}
//                 movie={movie}
//                 currentIndex={currentIndex}
//               />
//             ))}
//         </div>
//       )}

//       <button
//         onClick={prevSlide}
//         className="absolute left-0 top-1/2 h-full w-[35px] -translate-y-1/2 transform bg-[rgba(0,0,0,0.5)] min-[600px]:w-[55px]"
//       >
//         <FontAwesomeIcon
//           icon={faChevronLeft}
//           size="3x"
//           color="white"
//           fontWeight="bold"
//         />
//       </button>

//       <button
//         onClick={nextSlide}
//         className="absolute right-0 top-1/2 h-full w-[35px] -translate-y-1/2 transform bg-[rgba(0,0,0,0.5)] min-[600px]:w-[55px]"
//       >
//         <FontAwesomeIcon
//           icon={faChevronRight}
//           size="3x"
//           color="white"
//           fontWeight="bold"
//         />
//       </button>
//     </div>
//   );
// };

// export default RowTest;

import { FC, useEffect, useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchTVShows } from '../../services/fetchMoviesAndTVShows';
import { useMediaQuery } from 'react-responsive';
import Spinner from './Spinner';
import MovieSlider from './MovieSlider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Movie } from '../features/SlidersContainer';

interface SliderProps {
  title: string;
}

const RowTest: FC<SliderProps> = ({ title }) => {
  const [moviesPerPage, setMoviesPerPage] = useState(1);
  const [fade, setFade] = useState(true);

  const isVerySmallScreen = useMediaQuery({ query: '(max-width: 599px)' });
  const isSmallScreen = useMediaQuery({
    query: '(min-width: 600px) and (max-width: 679px)',
  });
  const isMediumScreen = useMediaQuery({
    query: '(min-width: 680px) and (max-width: 899px)',
  });
  const isLargeScreen = useMediaQuery({
    query: '(min-width: 900px) and (max-width: 1023px)',
  });
  const isVeryLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  useEffect(() => {
    if (isVerySmallScreen) setMoviesPerPage(1);
    else if (isSmallScreen) setMoviesPerPage(2);
    else if (isMediumScreen) setMoviesPerPage(3);
    else if (isLargeScreen) setMoviesPerPage(4);
    else if (isVeryLargeScreen) setMoviesPerPage(5);
  }, [
    isVerySmallScreen,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    isVeryLargeScreen,
  ]);

  const {
    data: movies = [],
    // fetchNextPage, hasNextPage, isFetchingNextPage,
    isLoading,
  } = useQuery<Movie[]>({
    queryKey: ['movies', title, moviesPerPage],
    queryFn: () => fetchTVShows(title, 'movies'),
    // queryFn: ({ pageParam = 1 }) => fetchTVShows(title, 'movies', pageParam),
    // getNextPageParam: (lastPage) => {
    //   if (lastPage.page < lastPage.total_pages) {
    //     return lastPage.page + 1;
    //   }
    //   return undefined;
    // },
    // initialPageParam: 1,
  });

  // const movies = data?.pages.flatMap((page) => page.results) || [];
  // const movies = data?.pages.flat() || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalPages = Math.floor(movies.length / moviesPerPage);
  console.log('totalPages', totalPages);

  console.log(
    'currentIndexcurrentIndexcurrentIndexcurrentIndexcurrentIndexcurrentIndexcurrentIndexcurrentIndexcurrentIndexcurrentIndexcurrentIndexcurrentIndexcurrentIndexcurrentIndexcurrentIndexcurrentIndexcurrentIndexcurrentIndexcurrentIndexcurrentIndexcurrentIndexcurrentIndexcurrentIndexcurrentIndexcurrentIndexcurrentIndex',
    currentIndex,
  );

  const prevSlide = () => {
    setFade(false);
    setCurrentIndex((prev) =>
      prev === 0 ? movies!.length - moviesPerPage : prev - moviesPerPage,
    );
  };

  // const nextSlide = () => {
  //   // if (currentIndex + moviesPerPage >= movies.length && hasNextPage) {
  //   //   fetchNextPage();
  //   // }
  //   setFade(false);
  //   setCurrentIndex((prev) =>
  //     prev + moviesPerPage >= movies.length ? 0 : prev + moviesPerPage,
  //   );
  // };
  const nextSlide = () => {
    if (!movies) return;
    // if (currentIndex + moviesPerPage >= movies.length && hasNextPage) {
    //   fetchNextPage();
    // }
    setFade(false);
    setCurrentIndex((prev) =>
      prev + moviesPerPage >= movies.length ? 0 : prev + moviesPerPage,
    );
  };

  useEffect(() => {
    if (!fade) {
      const timer = setTimeout(() => setFade(true), 300);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  // console.log('isFetchingNextPage', isFetchingNextPage);

  return (
    <div className="relative">
      {/* {isFetchingNextPage || isLoading ? ( */}
      {isLoading ? (
        <Spinner />
      ) : (
        <div
          className={`flex basis-full gap-1 px-9 transition-all duration-500 min-[600px]:px-14 ${
            fade ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
          }`}
        >
          {movies
            .slice(currentIndex, currentIndex + moviesPerPage)
            .map((movie) => (
              <MovieSlider
                key={movie.id}
                movie={movie}
                currentIndex={currentIndex}
              />
            ))}
        </div>
      )}

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 h-full w-[35px] -translate-y-1/2 transform bg-[rgba(0,0,0,0.5)] min-[600px]:w-[55px]"
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          size="3x"
          color="white"
          fontWeight="bold"
        />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 h-full w-[35px] -translate-y-1/2 transform bg-[rgba(0,0,0,0.5)] min-[600px]:w-[55px]"
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          size="3x"
          color="white"
          fontWeight="bold"
        />
      </button>
    </div>
  );
};

export default RowTest;

// import { FC, useEffect, useState } from 'react';
// import { useInfiniteQuery } from '@tanstack/react-query';
// import { fetchTVShows } from '../../services/fetchTVShows';
// import { useMediaQuery } from 'react-responsive';
// import Spinner from './Spinner';
// import MovieSlider from './MovieSlider';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faChevronLeft,
//   faChevronRight,
// } from '@fortawesome/free-solid-svg-icons';

// interface SliderProps {
//   title: string;
// }

// const RowTest: FC<SliderProps> = ({ title }) => {
//   const [moviesPerPage, setMoviesPerPage] = useState(1);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Set moviesPerPage based on screen size
//   const isVerySmallScreen = useMediaQuery({ query: '(max-width: 599px)' });
//   const isSmallScreen = useMediaQuery({
//     query: '(min-width: 600px) and (max-width: 679px)',
//   });
//   const isMediumScreen = useMediaQuery({
//     query: '(min-width: 680px) and (max-width: 899px)',
//   });
//   const isLargeScreen = useMediaQuery({
//     query: '(min-width: 900px) and (max-width: 1023px)',
//   });
//   const isVeryLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

//   useEffect(() => {
//     if (isVerySmallScreen) setMoviesPerPage(1);
//     else if (isSmallScreen) setMoviesPerPage(2);
//     else if (isMediumScreen) setMoviesPerPage(3);
//     else if (isLargeScreen) setMoviesPerPage(4);
//     else if (isVeryLargeScreen) setMoviesPerPage(5);
//   }, [
//     isVerySmallScreen,
//     isSmallScreen,
//     isMediumScreen,
//     isLargeScreen,
//     isVeryLargeScreen,
//   ]);

//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
//     useInfiniteQuery({
//       queryKey: ['movies', title, moviesPerPage],
//       queryFn: () => fetchTVShows(title, 'movies'),
//       getNextPageParam: (lastPage, allPages) =>
//         lastPage.length ? allPages.length + 1 : undefined,
//       initialPageParam: 1,
//     });

//   const movies = data?.pages.flat() || [];

//   const prevSlide = () => {
//     if (currentIndex === 0) {
//       setCurrentIndex(movies.length - moviesPerPage);
//     } else {
//       setCurrentIndex((prev) => prev - moviesPerPage);
//     }
//   };

//   const nextSlide = () => {
//     if (currentIndex + moviesPerPage >= movies.length && hasNextPage) {
//       fetchNextPage();
//     }
//     setCurrentIndex((prev) =>
//       prev + moviesPerPage >= movies.length ? 0 : prev + moviesPerPage,
//     );
//   };

//   return (
//     <div className="relative">
//       {isFetchingNextPage ? (
//         <Spinner />
//       ) : (
//         <div className="flex gap-1 px-9 transition-transform duration-500 min-[600px]:px-14">
//           {movies
//             .slice(currentIndex, currentIndex + moviesPerPage)
//             .map((movie) => (
//               <MovieSlider
//                 key={movie.id}
//                 movie={movie}
//                 currentIndex={currentIndex}
//               />
//             ))}
//         </div>
//       )}

//       <button
//         onClick={prevSlide}
//         className="absolute left-0 top-1/2 h-full w-[35px] -translate-y-1/2 transform bg-[rgba(0,0,0,0.5)] min-[600px]:w-[55px]"
//       >
//         <FontAwesomeIcon
//           icon={faChevronLeft}
//           size="3x"
//           color="white"
//           fontWeight="bold"
//         />
//       </button>

//       <button
//         onClick={nextSlide}
//         className="absolute right-0 top-1/2 h-full w-[35px] -translate-y-1/2 transform bg-[rgba(0,0,0,0.5)] min-[600px]:w-[55px]"
//       >
//         <FontAwesomeIcon
//           icon={faChevronRight}
//           size="3x"
//           color="white"
//           fontWeight="bold"
//         />
//       </button>
//     </div>
//   );
// };

// export default RowTest;
