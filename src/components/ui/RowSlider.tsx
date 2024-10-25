import { FC, Suspense, useEffect, useState } from 'react';
import { Movie } from '../features/SlidersContainer';
import MovieSlider from './MovieSlider';
import { PERCENTAGE_TRANSFORM, TMDBIMAGEURL } from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import {
  useInfiniteQuery,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { fetchPlayNowMovies } from '../../services/fetchPlayNowMovies';
import { transformString } from '../../helpers/transformString';
import replaceSpacesWithUnderscores from '../../helpers/replaceSpacesWithUndescores';
import { useMediaQuery } from 'react-responsive';
import { fetchAnimes } from '../../services/fetchAnime';
import { fetchTVShows } from '../../services/fetchMoviesAndTVShows';
import { useSearchParams } from 'react-router-dom';
import Spinner from './Spinner';
import { InView, useInView } from 'react-intersection-observer';
import Slider from 'react-slick';

interface SliderProps {
  title: string;
}

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
// import { transformString } from '../../helpers/transformString';
// import replaceSpacesWithUnderscores from '../../helpers/replaceSpacesWithUndescores';

interface SliderProps {
  title: string;
}

// const RowSlider: FC<SliderProps> = ({ title }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
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

//   const {
//     data,
//     fetchNextPage,
//     fetchPreviousPage,
//     hasNextPage,
//     hasPreviousPage,
//     isFetching,
//   } = useInfiniteQuery({
//     queryKey: ['movies', title, currentIndex, moviesPerPage],
//     queryFn: ({ pageParam = 1 }) =>
//       fetchTVShows(
//         replaceSpacesWithUnderscores(title),
//         'movies',
//         pageParam,
//         moviesPerPage,
//       ),
//     getNextPageParam: (lastPage, pages) => pages.length + 1,
//     getPreviousPageParam: (firstPage, pages) =>
//       pages.length > 1 ? pages.length - 1 : undefined,
//     initialPageParam: 1, // You need to define the initial page parameter
//   });

//   //   const {
//   //     data,
//   //     fetchNextPage,
//   //     fetchPreviousPage,
//   //     hasNextPage,
//   //     hasPreviousPage,
//   //     isFetching,
//   //   } = useInfiniteQuery(
//   // {   queryKey: ['movies', title],
//   //   queryFn: ({ pageParam = 1 }) => fetchTVShows(title, 'movies', pageParam),
//   //     {
//   //       getNextPageParam: (lastPage, pages) => pages.length + 1,
//   //       getPreviousPageParam: (firstPage, pages) =>
//   //         pages.length > 1 ? pages.length - 1 : undefined,
//   //     },}
//   //   );

//   const movies = data?.pages.flat() || [];

//   //   const prevSlide = () => {
//   //     setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
//   //   };

//   //   const nextSlide = () => {
//   //     setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
//   //   };

//   const prevSlide = () => {
//     if (hasPreviousPage) {
//       fetchPreviousPage();
//       setCurrentIndex((prev) =>
//         prev === 0 ? movies.length - moviesPerPage : prev - moviesPerPage,
//       );
//     }
//   };

//   const nextSlide = () => {
//     if (hasNextPage) {
//       fetchNextPage();
//       // setCurrentIndex((prev) =>
//       //   prev + moviesPerPage >= movies.length ? 0 : prev + moviesPerPage,
//       setCurrentIndex((prev) =>
//         prev === movies.length - 1 ? 0 : prev + moviesPerPage,
//       );
//     }
//   };

//   const styles = {
//     transform: `translateX(calc(-${(currentIndex * 100) / moviesPerPage}%))`,
//   };

//   return (
//     <div className="relative">
//       {isFetching ? (
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

// export default RowSlider;

const RowSlider: FC<SliderProps> = ({ title }) => {
  // const { data: movies } = useSuspenseQuery<Movie[]>({
  //   queryKey: [transformString(title)],
  //   // queryFn: fetchAnimes,
  //   queryFn: () => fetchPlayNowMovies(replaceSpacesWithUnderscores(title)),
  // });

  const [searchParams, setSearchParams] = useSearchParams();

  const mediaType = searchParams.get('mediaType') || 'movies';

  // Set up Intersection Observer

  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once when it first comes into view

    rootMargin: '100px', // Load slightly before fully in view
  });

  // Fetch movies only when in view

  // const {
  //   data,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  //   status,
  //   isLoading,
  // } = useInfiniteQuery<Movie[]>({
  //   queryKey: [`${transformString(title)}${mediaType}`],
  //   queryFn: ({ pageParam }) =>
  //     fetchTVShows(
  //       replaceSpacesWithUnderscores(title),
  //       mediaType,
  //       pageParam as number,
  //     ),
  //   getNextPageParam: (lastPage, allPages) => {
  //     // Return the parameter for the next page, or undefined if there is no next page
  //     return lastPage.length ? allPages.length + 1 : undefined;
  //   },
  //   initialPageParam: 1, // Start with page 1
  // });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [moviesPerPage, setMoviesPerPage] = useState(1);
  // const totalPages = movies ? Math.floor(movies.length / moviesPerPage) : 20;

  const {
    data: movies = [],
    refetch,
    isLoading,
    isPending,
  } = useQuery<Movie[]>({
    queryKey: [title, mediaType, currentIndex, moviesPerPage],
    queryFn: () =>
      fetchTVShows(
        title,
        mediaType,
        // currentIndex,
        // moviesPerPage,
      ),
  });

  const totalPages = Math.floor(movies.length / moviesPerPage);
  console.log('totalPages', totalPages);
  // const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
  //   useInfiniteQuery<Movie[]>({
  //     queryKey: [`${transformString(title)}${mediaType}`],
  //     queryFn: ({ pageParam = 1 }) =>
  //       fetchTVShows(replaceSpacesWithUnderscores(title), mediaType, pageParam),
  //   });

  // const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
  //   useInfiniteQuery(
  //     [`${transformString(title)}${mediaType}`],
  //     ({ pageParam = 1 }) =>
  //       fetchTVShows(replaceSpacesWithUnderscores(title), mediaType, pageParam),

  //     // {
  //     //   getNextPageParam: (lastPage, allPages) => {
  //     //     // Check if there's more data to fetch based on last page result
  //     //     return lastPage.length ? allPages.length + 1 : undefined;
  //     //   },
  //     // },
  //   );

  // Flatten the paginated data
  // const movies = data?.pages.flat() ?? [];

  // const {
  //   data: movies = [],
  //   refetch,
  //   isLoading,
  //   isPending,
  // } = useQuery<Movie[]>({
  //   // queryKey: [`${transformString(title)}${mediaType}`],
  //   queryKey: [title, mediaType],
  //   queryFn: () => fetchTVShows(replaceSpacesWithUnderscores(title), mediaType),
  //   enabled: false, // Initially disabled
  // });

  // Start fetch when component is in the viewport

  // useEffect(() => {
  //   if (inView) {
  //     refetch();
  //   }
  // }, [inView, refetch]);

  console.log('moviesdsssdsds', movies);

  // const isVerySmallScreen = useMediaQuery({ query: '(max-width: 599px)' });
  // const isSmallScreen = useMediaQuery({
  //   query: '(min-width: 600px) and (max-width: 767px)',
  // });
  // const isMediumScreen = useMediaQuery({
  //   query: '(min-width: 768px) and (max-width: 1023px)',
  // });
  // const isLargeScreen = useMediaQuery({
  //   query: '(min-width: 1024px)',
  // });

  const isVerySmallScreen = useMediaQuery({ query: '(max-width: 599px)' });
  const isSmallScreen = useMediaQuery({
    query: '(min-width: 600px) and (max-width: 679px)',
  });
  // const isSmallScreen = useMediaQuery({
  //   query: '(min-width: 600px) and (max-width: 767px)',
  // });
  const isMediumScreen = useMediaQuery({
    query: '(min-width: 680px) and (max-width: 899px)',
  });
  const isLargeScreen = useMediaQuery({
    query: '(min-width: 900px) and (max-width: 1023px)',
  });
  const isVeryLargeScreen = useMediaQuery({
    query: '(min-width: 1024px)',
  });

  // const styles = {
  //   transform: isVerySmallScreen
  //     ? `translateX(calc(-${currentIndex * PERCENTAGE_TRANSFORM}% + ${currentIndex * 68}px))`
  //     : isSmallScreen
  //       ? `translateX(calc(-${currentIndex * PERCENTAGE_TRANSFORM}% + ${currentIndex * 108}px))`
  //       : isMediumScreen
  //         ? `translateX(calc(-${currentIndex * PERCENTAGE_TRANSFORM}% + ${currentIndex * 108}px))`
  //         : isLargeScreen
  //           ? `translateX(calc(-${currentIndex * PERCENTAGE_TRANSFORM}% + ${currentIndex * 108}px))`
  //           : '',
  // };

  const styles = {
    transform: isVerySmallScreen
      ? `translateX(calc(-${currentIndex * PERCENTAGE_TRANSFORM}% + ${currentIndex * 68}px))`
      : isSmallScreen || isMediumScreen || isLargeScreen || isVeryLargeScreen
        ? `translateX(calc(-${currentIndex * PERCENTAGE_TRANSFORM}% + ${currentIndex * 108}px))`
        : '',
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const nextSlide = () => {
    // setCurrentIndex((prev) => prev + 1);
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (isVerySmallScreen) {
      setCurrentIndex(0);
      setMoviesPerPage(1);
    } else if (isSmallScreen) {
      setCurrentIndex(0);
      setMoviesPerPage(2);
    } else if (isMediumScreen) {
      setCurrentIndex(0);
      setMoviesPerPage(3);
    } else if (isLargeScreen) {
      setCurrentIndex(0);
      setMoviesPerPage(4);
    } else if (isVeryLargeScreen) {
      setCurrentIndex(0);
      setMoviesPerPage(5);
    }
  }, [
    isVerySmallScreen,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    isVeryLargeScreen,
  ]);

  // useEffect(() => {
  //   if (isVerySmallScreen) {
  //     setCurrentIndex(0);
  //     setMoviesPerPage(1);
  //   } else if (isSmallScreen) {
  //     setCurrentIndex(0);
  //     setMoviesPerPage(2);
  //   } else if (isMediumScreen) {
  //     setCurrentIndex(0);
  //     setMoviesPerPage(4);
  //   } else if (isLargeScreen) {
  //     setCurrentIndex(0);
  //     setMoviesPerPage(5);
  //   }
  // }, [isSmallScreen, isMediumScreen, isLargeScreen]);

  return (
    <div className="relative">
      {isPending ? (
        // <div className="h-screen w-full">
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Spinner />
        </div>
      ) : (
        // <Spinner />
        <div
          ref={ref}
          className="flex basis-full gap-1 px-9 transition-transform duration-500 min-[600px]:px-14"
          style={{ ...styles }}
        >
          {/* {currentIndex === 0 && movies?.[movies?.length - 1] && (
        <div className="absolute -left-[94%] h-full w-full flex-shrink-0 min-[600px]:-left-[48%]">
          <MovieSlider movie={movies?.[movies.length - 1]} currentIndex={-2} />
        </div>
      )} */}

          {movies?.map((movie) => (
            <Suspense key={movie?.id} fallback={<Spinner />}>
              <MovieSlider
                // key={movie?.id}
                movie={movie}
                currentIndex={currentIndex}
              />
            </Suspense>
          ))}
        </div>
      )}

      {/* Intersection Observer for Auto-Fetching the Next Page */}
      {/* <InView
        as="div"
        onChange={(inView) => {
          if (inView && hasNextPage) {
            fetchNextPage();
          }
        }}
      >
        {isFetchingNextPage ? <Spinner /> : <div>Load More</div>}
      </InView> */}

      {/* Next and Prev buttons */}
      <button
        onClick={prevSlide}
        // px-3 py-2
        className="absolute left-0 top-1/2 h-full w-[35px] -translate-y-1/2 transform bg-[rgba(0,0,0,0.5)] min-[600px]:w-[55px]"
        // className="absolute left-2 top-1/2 -translate-y-1/2 transform"
      >
        {/* {'<'} */}
        <FontAwesomeIcon
          icon={faChevronLeft}
          size="3x"
          color="white"
          fontWeight="bold"
        />
        {/* <FontAwesomeIcon icon={faAngleLeft} size="3x" /> */}
      </button>
      {/* <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 transform bg-gray-800 px-3 py-2 text-white"
      >
        Next
      </button> */}

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 h-full w-[35px] -translate-y-1/2 transform bg-[rgba(0,0,0,0.5)] min-[600px]:w-[55px]"
        // className="absolute right-2 top-1/2 -translate-y-1/2"
        // className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full px-2 py-4 text-9xl text-white"
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          size="3x"
          color="white"
          fontWeight="bold"
        />
      </button>
    </div>

    // <div className="relative">
    //   <div
    //     className="flex basis-full gap-1 px-9 transition-transform duration-500 min-[600px]:px-14"
    //     style={{ ...styles }}
    //   >
    //     {movies?.map((movie) => (
    //       <div
    //         key={movie.id}
    //         className="relative flex-shrink-0 grow-0 basis-full cursor-pointer min-[600px]:basis-[calc(50%-2px)] min-[768px]:basis-[calc(25%-3px)] lg:basis-[calc(20%-3.2px)]"
    //       >
    //         <MovieSlider movie={movie} currentIndex={currentIndex} />
    //       </div>
    //     ))}
    //   </div>
    //   // {/* Next and Prev buttons */}
    //   <button
    //     onClick={prevSlide}
    //     // px-3 py-2
    //     className="absolute left-0 top-1/2 h-full w-[35px] -translate-y-1/2 transform bg-[rgba(0,0,0,0.5)] min-[600px]:w-[55px]"
    //     // className="absolute left-2 top-1/2 -translate-y-1/2 transform"
    //   >
    //     {/* {'<'} */}
    //     <FontAwesomeIcon
    //       icon={faChevronLeft}
    //       size="3x"
    //       color="white"
    //       fontWeight="bold"
    //     />
    //     {/* <FontAwesomeIcon icon={faAngleLeft} size="3x" /> */}
    //   </button>
    //   {/* <button
    //     onClick={nextSlide}
    //     className="absolute right-4 top-1/2 -translate-y-1/2 transform bg-gray-800 px-3 py-2 text-white"
    //   >
    //     Next
    //   </button> */}
    //   <button
    //     onClick={nextSlide}
    //     className="absolute right-0 top-1/2 h-full w-[35px] -translate-y-1/2 transform bg-[rgba(0,0,0,0.5)] min-[600px]:w-[55px]"
    //     // className="absolute right-2 top-1/2 -translate-y-1/2"
    //     // className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full px-2 py-4 text-9xl text-white"
    //   >
    //     <FontAwesomeIcon
    //       icon={faChevronRight}
    //       size="3x"
    //       color="white"
    //       fontWeight="bold"
    //     />
    //   </button>
    // </div>
  );
};

export default RowSlider;

// const fetchRows = async ({ pageParam = 1 }) => {
//   const response = await fetch(
//     `https://api.example.com/rows?page=${pageParam}`,
//   );
//   return response.json();
// };

// const RowSlider: FC<SliderProps> = ({ title }) => {
//   const [searchParams, setSearchParams] = useSearchParams();

//   const mediaType = searchParams.get('mediaType') || 'movies';

//   // const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
//   //   useInfiniteQuery({
//   //     queryKey: [title], // key
//   //     // queryFn: fetchRows, // function to fetch data
//   //     queryFn: ({ pageParam }) =>
//   //       fetchTVShows(
//   //         replaceSpacesWithUnderscores(title),
//   //         mediaType,
//   //         pageParam as number,
//   //       ),
//   //     getNextPageParam: (lastPage, allPages) => {
//   //       // Return the parameter for the next page, or undefined if there is no next page
//   //       return lastPage.length ? allPages.length + 1 : undefined;
//   //     },
//   //     initialPageParam: 1, // Start with page 1
//   //   });

//   // if (isLoading) {
//   //   return <div>Loading...</div>;
//   // }

//   // if (error) {
//   //   return <div>Error: {error.message}</div>;
//   // }

//   // return (
//   //   <div className="h-full w-full">
//   //     {data?.pages.map((page, index) => (
//   //       <div key={index}>
//   //         {page?.rows?.map((row: any) => <div key={row.id}>{row.name}</div>)}
//   //       </div>
//   //     ))}
//   //     {
//   //       <button
//   //         className="text-white"
//   //         onClick={() => fetchNextPage()}
//   //         disabled={isFetching}
//   //       >
//   //         Load more
//   //       </button>
//   //     }
//   //   </div>

//   const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery<
//     Movie[]
//   >({
//     queryKey: [title], // key
//     // queryFn: fetchRows, // function to fetch data
//     queryFn: ({ pageParam }) =>
//       fetchTVShows(
//         replaceSpacesWithUnderscores(title),
//         mediaType,
//         pageParam as number,
//       ),
//     getNextPageParam: (lastPage, allPages) => {
//       // Return the parameter for the next page, or undefined if there is no next page
//       return lastPage.length ? allPages.length + 1 : undefined;
//     },
//     initialPageParam: 1, // Start with page 1
//   });

//   const [inViewRef, inView] = useInView({ threshold: 1 });
//   useEffect(() => {
//     if (inView && hasNextPage) fetchNextPage();
//   }, [inView, hasNextPage]);

//   if (isLoading) return <Spinner />;

//   return (
//     <Slider>
//       {data?.pages.map((page) =>
//         page?.map((movie) => (
//           <div
//             key={movie.id}
//             className="w-[calc(100%/3)] p-2 md:w-[calc(100%/5)]"
//           >
//             <img
//               src={`${TMDBIMAGEURL}${movie.poster_path}`}
//               alt={movie.title}
//             />
//           </div>
//         )),
//       )}
//       <div ref={inViewRef} />
//     </Slider>
//   );
// };

// export default RowSlider;
