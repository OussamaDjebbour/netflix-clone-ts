// import React, { useEffect, useState, useRef } from 'react';

// type Movie = {
//   id: number;
//   title: string;
//   poster_path: string;
// };

// const MovieSlider: React.FC = () => {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const sliderRef = useRef<HTMLDivElement>(null);

//   // Fetch 20 popular movies from TMDb
//   useEffect(() => {
//     const fetchMovies = async () => {
//       const apiKey = import.meta.env.VITE_API_KEY; // Replace with your TMDb API key
//       const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

//       const response = await fetch(url);
//       const data = await response.json();
//       setMovies(data.results.slice(0, 20)); // Limit to 20 movies
//     };

//     fetchMovies();
//   }, []);

//   // Function to scroll the slider
//   const slide = (direction: string) => {
//     if (sliderRef.current) {
//       const scrollAmount = sliderRef.current.offsetWidth;
//       if (direction === 'left') {
//         sliderRef.current.scrollLeft -= scrollAmount;
//       } else {
//         sliderRef.current.scrollLeft += scrollAmount;
//       }
//     }
//   };

//   return (
//     <div className="relative mx-auto w-full max-w-screen-lg">
//       {/* Left Navigation Button */}
//       <button
//         onClick={() => slide('left')}
//         className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-gray-800 px-2 py-4 text-white"
//       >
//         {'<'}
//       </button>

//       {/* Slider Container */}
//       <div
//         ref={sliderRef}
//         className="scrollbar-hide flex snap-x snap-mandatory overflow-x-scroll scroll-smooth"
//       >
//         {movies.map((movie) => (
//           <div
//             key={movie.id}
//             className="m-2 h-96 w-64 flex-none snap-center rounded-lg"
//           >
//             <img
//               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//               alt={movie.title}
//               className="h-full w-full rounded-lg object-cover shadow-lg"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Right Navigation Button */}
//       <button
//         onClick={() => slide('right')}
//         className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-gray-800 px-2 py-4 text-white"
//       >
//         {'>'}
//       </button>
//     </div>
//   );
// };

// export default MovieSlider;

import React, { useEffect, useState } from 'react';

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

const MovieSlider: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 5; // Number of movies to show per page

  // Fetch 20 popular movies from TMDb
  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = import.meta.env.VITE_API_KEY; // Replace with your TMDb API key
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results.slice(0, 20)); // Limit to 20 movies
    };

    fetchMovies();
  }, []);

  // Calculate pagination logic
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  // Change page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-screen-lg">
      {/* Slider Container */}
      <div className="flex space-x-4 overflow-hidden">
        {currentMovies.map((movie) => (
          //   <div
          //     key={movie.id}
          //     className="m-2 h-96 w-1/5 flex-none overflow-hidden rounded-lg bg-gray-800"
          //   >
          //     <img
          //       src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          //       alt={movie.title}
          //       className="h-full w-full object-cover"
          //     />
          //   </div>
          <div
            key={movie.id}
            className="m-2 w-full flex-none overflow-hidden rounded-lg bg-gray-800 min-[500px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`rounded-lg bg-gray-800 px-4 py-2 text-white ${
            currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          Previous
        </button>

        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`rounded-lg bg-gray-800 px-4 py-2 text-white ${
            currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieSlider;
