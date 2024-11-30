// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useQuery } from '@tanstack/react-query';
// import React, { useRef, useState } from 'react';
// import { searchMoviesAndTv } from '../../services/searchMoviesAndTv';
// import { SearchResult } from '../../types/tmdb';

// interface SearchBarProps {
//   isSearchbarOpen: boolean;
//   setIsSearchbarOpen: (isSearchbarOpen: boolean) => void;
// }

// const SearchBar: React.FC<SearchBarProps> = ({
//   isSearchbarOpen,
//   setIsSearchbarOpen,
// }) => {
//   // const [isSearchbarOpen, setIsSearchbarOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const inputRef = useRef<HTMLInputElement>(null);

//   // const [query, setQuery] = useState('');
//   const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');
//   // const [results, setResults] = useState<SearchResult[]>([]);

//   const { data: searchResults } = useQuery<SearchResult[]>({
//     queryKey: ['movies', searchTerm, mediaType],
//     queryFn: () => searchMoviesAndTv(searchTerm, mediaType),
//   });

//   //   const handleFocus = () => setIsSearchbarOpen(true);
//   console.log('searchTerm', searchTerm, searchResults);

//   const handleFocus = () => {
//     setIsSearchbarOpen(true);
//     // Set focus on the input when it expands
//     // setTimeout(() => inputRef.current?.focus(), 0);
//     inputRef.current?.focus();
//   };
//   const handleBlur = () => {
//     if (searchTerm.trim() === '') {
//       setIsSearchbarOpen(false);
//     }
//   };

//   return (
//     <>
//       <div
//         // left-0 right-0 z-50
//         className={`absolute right-[4.5rem] flex items-center transition-all duration-300 small:right-12 ${
//           isSearchbarOpen ? 'small:w-64' : 'w-10'
//         }`}
//       >
//         {/* {!isSearchbarOpen && ( */}
//         <FontAwesomeIcon
//           icon={faMagnifyingGlass}
//           onClick={handleFocus}
//           color="white"
//           size="lg"
//           // ${isSearchbarOpen ? 'hidden small:block' : 'block'}
//           className={`absolute ${isSearchbarOpen && 'max-[680px]:hidden'} left-5 z-50 cursor-pointer`}
//         />
//         {/* )} */}
//         {/* <FiSearch
//         className="absolute left-3 cursor-pointer text-gray-500"
//         size={20}
//       /> */}
//         {/* Child element with a higher z-index  */}
//         {/* <div className="absolute left-16 top-16 z-20 bg-red-500 px-4 py-2 text-white">
//         I am on top of the fixed parent!
//       </div> */}
//         <input
//           ref={inputRef}
//           type="text"
//           className={`fixed left-0 right-0 top-0 bg-[rgb(31,31,31)] py-2.5 pl-6 pr-4 text-white outline-none transition-all duration-300 focus:ring-neutral-300 small:left-auto small:right-10 small:top-auto small:block small:w-64 small:rounded-full small:pl-10 small:focus:ring-1 ${
//             isSearchbarOpen ? 'z-40 w-full opacity-100' : 'w-0 opacity-0'
//             // isSearchbarOpen ? 'right-0 z-50 w-screen opacity-100' : 'w-0 opacity-0'
//           }`}
//           // className={`rounded-full bg-[rgba(0,0,0,1)] py-2 pl-10 pr-4 text-white outline-none transition-all duration-300 focus:ring-[1.5px] focus:ring-neutral-300 ${
//           //   isSearchbarOpen ? 'right-0 z-50 w-screen opacity-100' : 'w-0 opacity-0'
//           // }`}
//           placeholder="Search a movie or a tvShow"
//           value={searchTerm}
//           onBlur={handleBlur}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div
//         className="fixed left-0 right-0 top-0 z-50"
//         style={{ height: '16px' }} // match the height of the navbar
//       >
//         <div className="absolute left-0 right-0 top-0 flex flex-col items-center gap-2.5 overflow-y-auto bg-[rgb(31,31,31)] text-white">
//           {searchResults?.map((result) => (
//             <div key={result.id} className="w-full p-2.5">
//               <h3>{result.title || result.name}</h3>
//               {/* <p>{result.overview}</p> */}
//               {result.poster_path && (
//                 <img
//                   src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
//                   alt={result.title || result.name}
//                   className="max-w-24 rounded-md"
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* <p>{result.overview}</p> */}
//       {/* <div className="absolute left-0 right-0 top-10 flex flex-col items-center gap-2.5 overflow-y-auto bg-[rgb(31,31,31)] text-white">
//         {searchResults?.map((result) => (
//           <div key={result.id} className="w-full p-2.5">
//             <h3>{result.title || result.name}</h3>
//             {result.poster_path && (
//               <img
//                 src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
//                 alt={result.title || result.name}
//                 className="max-w-24 rounded-md"
//               />
//             )}
//           </div>
//         ))}
//       </div> */}
//     </>
//   );
// };

// export default SearchBar;

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchMoviesAndTv } from '../../services/searchMoviesAndTv';
import { SearchResult } from '../../types/tmdb';

interface SearchBarProps {
  isSearchbarOpen: boolean;
  setIsSearchbarOpen: (isSearchbarOpen: boolean) => void;
}

// const SearchBar: React.FC<SearchBarProps> = ({
//   isSearchbarOpen,
//   setIsSearchbarOpen,
// }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [navbarHeight, setNavbarHeight] = useState(0); // State to store navbar height
//   const inputRef = useRef<HTMLInputElement>(null);

//   const { data: searchResults } = useQuery<SearchResult[]>({
//     queryKey: ['movies', searchTerm],
//     queryFn: () => searchMoviesAndTv(searchTerm, 'movie'),
//     enabled: !!searchTerm, // Fetch only when there's a search term
//   });

//   useEffect(() => {
//     // Dynamically calculate navbar height
//     const navbar = document.querySelector('nav');
//     if (navbar) {
//       setNavbarHeight(navbar.offsetHeight);
//     }
//   }, []);

//   const handleFocus = () => {
//     setIsSearchbarOpen(true);
//     inputRef.current?.focus();
//   };

//   const handleBlur = () => {
//     if (searchTerm.trim() === '') {
//       setIsSearchbarOpen(false);
//     }
//   };

//   return (
//     <>
//       <div
//         className={`absolute right-[4.5rem] flex items-center transition-all duration-300 small:right-12 ${
//           isSearchbarOpen ? 'small:w-64' : 'w-10'
//         }`}
//       >
//         <FontAwesomeIcon
//           icon={faMagnifyingGlass}
//           onClick={handleFocus}
//           color="white"
//           size="lg"
//           className={`absolute ${
//             isSearchbarOpen && 'max-[680px]:hidden'
//           } left-5 z-50 cursor-pointer`}
//         />
//         <input
//           ref={inputRef}
//           type="text"
//           className={`fixed left-0 right-0 bg-[rgb(31,31,31)] py-2.5 pl-6 pr-4 text-white outline-none transition-all duration-300 focus:ring-neutral-300 small:left-auto small:right-10 small:top-auto small:block small:w-64 small:rounded-full small:pl-10 small:focus:ring-1 ${
//             isSearchbarOpen ? 'z-40 w-full opacity-100' : 'w-0 opacity-0'
//           }`}
//           placeholder="Search a movie or a tvShow"
//           value={searchTerm}
//           onBlur={handleBlur}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* Search Results */}
//       {searchResults && (
//         <div
//           className="absolute left-0 right-0 flex flex-col items-center gap-2.5 overflow-y-auto bg-[rgb(31,31,31)] text-white"
//           style={{ top: `${navbarHeight}px` }} // Dynamic positioning below the navbar
//         >
//           {searchResults.map((result) => (
//             <div key={result.id} className="w-full p-2.5">
//               <h3>{result.title || result.name}</h3>
//               {result.poster_path && (
//                 <img
//                   src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
//                   alt={result.title || result.name}
//                   className="max-w-24 rounded-md"
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// };

// export default SearchBar;

// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import React, { useRef, useState, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { searchMoviesAndTv } from '../../services/searchMoviesAndTv';
// import { SearchResult } from '../../types/tmdb';

// interface SearchBarProps {
//   isSearchbarOpen: boolean;
//   setIsSearchbarOpen: (isSearchbarOpen: boolean) => void;
// }

const SearchBar: React.FC<SearchBarProps> = ({
  isSearchbarOpen,
  setIsSearchbarOpen,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [navbarHeight, setNavbarHeight] = useState(0); // State to store navbar height
  const resultsRef = useRef<HTMLDivElement>(null); // Reference for the search results container
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: searchResults } = useQuery<SearchResult[]>({
    queryKey: ['movies', searchTerm],
    queryFn: () => searchMoviesAndTv(searchTerm, 'movie'),
    enabled: !!searchTerm, // Fetch only when there's a search term
  });

  useEffect(() => {
    // Dynamically calculate navbar height
    const navbar = document.querySelector('nav');
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);

  useEffect(() => {
    // Scroll search results into view when they are rendered
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [searchResults]);

  const handleFocus = () => {
    setIsSearchbarOpen(true);
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    if (searchTerm.trim() === '') {
      setIsSearchbarOpen(false);
    }
  };

  return (
    <>
      <div
        className={`absolute right-[4.5rem] flex items-center transition-all duration-300 small:right-12 ${
          isSearchbarOpen ? 'small:w-64' : 'w-10'
        }`}
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          onClick={handleFocus}
          color="white"
          size="lg"
          className={`absolute ${
            isSearchbarOpen && 'max-[680px]:hidden'
          } left-5 z-50 cursor-pointer`}
        />
        <input
          ref={inputRef}
          type="text"
          className={`fixed left-0 right-0 bg-[rgb(31,31,31)] py-2.5 pl-6 pr-4 text-white outline-none transition-all duration-300 focus:ring-neutral-300 small:left-auto small:right-10 small:top-auto small:block small:w-64 small:rounded-full small:pl-10 small:focus:ring-1 ${
            isSearchbarOpen ? 'z-40 w-full opacity-100' : 'w-0 opacity-0'
          }`}
          placeholder="Search a movie or a tvShow"
          value={searchTerm}
          onBlur={handleBlur}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Search Results */}
      {/* {searchResults && (
        <div
          ref={resultsRef}
          className="absolute left-0 right-0 flex flex-col items-center gap-2.5 overflow-y-auto bg-[rgb(31,31,31)] text-white"
          style={{
            top: `${navbarHeight}px`,
            maxHeight: `calc(100vh - ${navbarHeight}px)`, // Prevent overlapping viewport
          }}
        >
          {searchResults.map((result) => (
            <div key={result.id} className="w-full p-2.5">
              <h3>{result.title || result.name}</h3>
              {result.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                  alt={result.title || result.name}
                  className="max-w-24 rounded-md"
                />
              )}
            </div>
          ))}
        </div>
      )} */}
    </>
  );
};

export default SearchBar;

// export default SearchBar;

// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import React, { useRef, useState } from 'react';

// const SearchBar: React.FC = () => {
//   const [isSearchbarOpen, setIsSearchbarOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const inputRef = useRef<HTMLInputElement>(null);

//   const handleFocus = () => {
//     setIsSearchbarOpen(true);
//     inputRef.current?.focus();
//   };

//   const handleBlur = () => {
//     if (searchTerm.trim() === '') {
//       setIsSearchbarOpen(false);
//     }
//   };

//   return (
//     <div className="relative flex items-center">
//       {/* Search Icon */}
//       <FontAwesomeIcon
//         icon={faMagnifyingGlass}
//         onClick={handleFocus}
//         color="white"
//         size="lg"
//         className="z-50 cursor-pointer"
//       />

//       {/* Input Field */}
//       <input
//         ref={inputRef}
//         type="text"
//         className={`fixed left-0 top-[58px] bg-[rgba(0,0,0,0.7)] py-2 pl-10 pr-4 text-white outline-none transition-all duration-300 focus:ring-[1.5px] focus:ring-neutral-300 ${
//           isSearchbarOpen ? 'z-50 w-full opacity-100' : 'w-0 opacity-0'
//         }`}
//         placeholder="Search a movie or a TV Show"
//         value={searchTerm}
//         onBlur={handleBlur}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//     </div>
//   );
// };

// export default SearchBar;
