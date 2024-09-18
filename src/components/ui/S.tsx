// import React, { useEffect, useState } from 'react';

// type Movie = {
//   id: number;
//   title: string;
//   poster_path: string;
// };

// const S: React.FC = () => {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const itemsPerPage = 5; // Number of movies to show per page (adjust as needed)

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

//   // Handle pagination
//   const nextPage = () => {
//     if (currentPage < Math.ceil(movies.length / itemsPerPage) - 1) {
//       setCurrentPage((prev) => prev + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 0) {
//       setCurrentPage((prev) => prev - 1);
//     }
//   };

//   // Get movies to display based on current page
//   const paginatedMovies = movies.slice(
//     currentPage * itemsPerPage,
//     (currentPage + 1) * itemsPerPage,
//   );

//   return (
//     // <div className="relative mx-auto w-full max-w-screen-lg">
//     <div className="relative mx-auto w-full">
//       {/* Slider Container */}
//       <div className="flex justify-center overflow-hidden">
//         {paginatedMovies.map((movie) => (
//           <div
//             key={movie.id}
//             className="m-2 w-1/6 flex-none snap-center rounded-lg"
//           >
//             {/* <div className="m-2 h-96 w-64 flex-none snap-center rounded-lg md:w-72 lg:w-80"> */}
//             <img
//               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//               alt={movie.title}
//               className="h-full w-full rounded-lg object-cover shadow-lg"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Pagination Buttons */}
//       <div className="mt-4 flex justify-between">
//         <button
//           onClick={prevPage}
//           disabled={currentPage === 0}
//           className={`rounded-lg bg-gray-800 px-4 py-2 text-white ${
//             currentPage === 0 ? 'cursor-not-allowed opacity-50' : ''
//           }`}
//         >
//           Previous
//         </button>
//         <button
//           onClick={nextPage}
//           disabled={currentPage >= Math.ceil(movies.length / itemsPerPage) - 1}
//           className={`rounded-lg bg-gray-800 px-4 py-2 text-white ${
//             currentPage >= Math.ceil(movies.length / itemsPerPage) - 1
//               ? 'cursor-not-allowed opacity-50'
//               : ''
//           }`}
//         >
//           Next
//         </button>
//       </div>

//       {/* Pagination Dots */}
//       <div className="mt-4 flex justify-center">
//         {Array.from({ length: Math.ceil(movies.length / itemsPerPage) }).map(
//           (_, index) => (
//             <div
//               key={index}
//               className={`mx-1 h-3 w-3 rounded-full ${
//                 index === currentPage ? 'bg-gray-800' : 'bg-gray-400'
//               }`}
//             ></div>
//           ),
//         )}
//       </div>
//     </div>
//   );
// };

// export default S;

import React, { useEffect, useState } from 'react';

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

const S: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Default value
  const [currentPage, setCurrentPage] = useState(0);

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

  // Update itemsPerPage based on screen size
  useEffect(() => {
    console.log('hiiiiiiii');
    const updateItemsPerPage = () => {
      console.log('hiiiiiiii');

      if (window.matchMedia('(min-width: 1024px)').matches) {
        setItemsPerPage(5); // Larger screen: show 5 items per page
      } else if (window.matchMedia('(min-width: 768px)').matches) {
        setItemsPerPage(4); // Medium screen: show 4 items per page
      } else {
        setItemsPerPage(2); // Small screen: show 2 items per page
      }
    };

    // Initial setting
    updateItemsPerPage();

    // Listen for resize events to update itemsPerPage
    window.addEventListener('resize', updateItemsPerPage);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // Handle pagination
  const nextPage = () => {
    if (currentPage < Math.ceil(movies.length / itemsPerPage) - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Get movies to display based on current page
  const paginatedMovies = movies.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  return (
    <div className="relative mx-auto w-full">
      {/* Slider Container */}
      <div className="flex justify-center overflow-hidden">
        {paginatedMovies.map((movie) => (
          <div
            key={movie.id}
            className="m-2 h-96 w-64 flex-none snap-center rounded-lg"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="h-full w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className={`rounded-lg bg-gray-800 px-4 py-2 text-white ${
            currentPage === 0 ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage >= Math.ceil(movies.length / itemsPerPage) - 1}
          className={`rounded-lg bg-gray-800 px-4 py-2 text-white ${
            currentPage >= Math.ceil(movies.length / itemsPerPage) - 1
              ? 'cursor-not-allowed opacity-50'
              : ''
          }`}
        >
          Next
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(movies.length / itemsPerPage) }).map(
          (_, index) => (
            <div
              key={index}
              className={`mx-1 h-3 w-3 rounded-full ${
                index === currentPage ? 'bg-gray-800' : 'bg-gray-400'
              }`}
            ></div>
          ),
        )}
      </div>
    </div>
  );
};

export default S;
