import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
// import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const Slider: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [moviesPerPage, setMoviesPerPage] = useState(1);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const isSmallScreen = useMediaQuery({ query: '(max-width: 599px)' });
  const isMediumScreen = useMediaQuery({
    query: '(min-width: 600px) and (max-width: 767px)',
  });
  const isLargeScreen = useMediaQuery({ query: '(min-width: 768px)' });

  useEffect(() => {
    if (isSmallScreen) {
      setCurrentIndex(0);
      setMoviesPerPage(1);
    } else if (isMediumScreen) {
      // if (currentIndex > 9) setCurrentIndex(0);
      setCurrentIndex(0);
      setMoviesPerPage(2);
    } else if (isLargeScreen) {
      // if (currentIndex > 4) setCurrentIndex(0);
      setCurrentIndex(0);
      setMoviesPerPage(4);
    }
  }, [isSmallScreen, isMediumScreen, isLargeScreen]);

  useEffect(() => {
    const fetchMovies = async () => {
      const API_KEY = import.meta.env.VITE_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;

      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results.slice(0, 20)); // Get only the first 20 movies
    };
    fetchMovies();

    // const fetchNowPlayingMovies = async (): Promise<void> => {
    //   const response = await fetch(`${TMDB_API_URL}`);
    //   const data = await response.json();
    //   setMovies(data.slice(0, 20));
    // };
    // fetchNowPlayingMovies();
    // axios.get(TMDB_API_URL).then((response) => {
    //   setMovies(response.data.results.slice(0, 20)); // Get the first 20 movies
    // });
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  console.log('currentIndex', currentIndex);
  console.log('moviesPerPage', moviesPerPage);
  console.log('totalPages', totalPages);

  return (
    // <div className="scrollbar-hide relative w-full overflow-x-scroll">
    //   <div
    //     className="flex transition-transform duration-500"
    //     style={{
    //       transform: `translateX(-${currentIndex * 100}%)`,
    //     }}
    //   >
    //     {movies.map((movie) => (
    //       <div
    //         key={movie.id}
    //         className="w-full flex-shrink-0 px-2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
    //       >
    //         <div className="aspect-w-2 aspect-h-3 w-full">
    //           <img
    //             src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
    //             alt={movie.title}
    //             className="h-full w-full object-cover"
    //           />
    //         </div>
    //       </div>
    //     ))}
    //   </div>

    //   {/* Previous Button */}
    //   <button
    //     onClick={prevSlide}
    //     className="absolute left-4 top-1/2 -translate-y-1/2 transform bg-gray-800 px-3 py-2 text-white"
    //   >
    //     Prev
    //   </button>

    //   {/* Next Button */}
    //   <button
    //     onClick={nextSlide}
    //     className="absolute right-4 top-1/2 -translate-y-1/2 transform bg-gray-800 px-3 py-2 text-white"
    //   >
    //     {'>'}
    //   </button>
    // </div>

    <div className="relative -mt-4 w-full overflow-y-hidden overflow-x-scroll [&::-webkit-scrollbar]:hidden">
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={`w-full flex-shrink-0 min-[600px]:w-1/2 min-[768px]:w-1/4`}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-auto object-contain"
            />
          </div>
        ))}
      </div>

      {/* Next and Prev buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 transform bg-gray-800 px-3 py-2 text-white"
      >
        Prev
      </button>
      {/* <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 transform bg-gray-800 px-3 py-2 text-white"
      >
        Next
      </button> */}

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full px-2 py-4 text-9xl text-white"
      >
        {'>'}
      </button>
    </div>
  );
};

export default Slider;
