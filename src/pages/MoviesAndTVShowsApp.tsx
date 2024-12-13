import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import { AnimatePresence, motion } from 'framer-motion';
import { useIsShowNavbarContext } from '../context/useIsShowNavbarContext';
import { useMediaContext } from '../context/useMediaContext';
import { useIsImageLoadedContext } from '../context/useIsImageLoadedContext';
import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SearchResult } from '../types/tmdb';
import {
  // fetchFamilyAndAnimationContent,
  searchMoviesAndTv,
} from '../services/searchMoviesAndTv';
import SearchResults from '../components/ui/SearchResults';
import useDebounce from '../hooks/useDebounce';
import Spinner from '../components/ui/Spinner';
import Overlay from '../components/ui/Overlay';

const MoviesAndTVShowsApp = () => {
  const { isShow, handleToggleIsShow } = useIsShowNavbarContext();
  // const { isImageLoaded } = useIsImageLoadedContext();
  const { handleChangeMedia } = useMediaContext();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  // const [navbarHeight, setNavbarHeight] = useState(0); // State to store navbar height

  const [isSearchbarOpen, setIsSearchbarOpen] = useState(false);

  const debouncedQuery = useDebounce(searchTerm, 800); // Debounce delay of 800ms

  const {
    data: searchResults,
    isLoading,
    isError,
  } = useQuery<SearchResult[]>({
    queryKey: ['movies', debouncedQuery],
    queryFn: () => searchMoviesAndTv(debouncedQuery, 'movie'),
    // queryFn: () => fetchFamilyAndAnimationContent(debouncedQuery),
    // enabled: !!debouncedQuery, // Fetch only when there's a search query
    enabled: debouncedQuery.trim().length > 2, // Disable the query when debouncedQuery length is less than or equal to 2
  });

  // if (isLoading) {
  //   return <Spinner />;
  // }

  console.log('isLoading11111111111111', isLoading);

  console.log('isError', isError);

  return (
    // <>
    <div className="relative">
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isSearchbarOpen={isSearchbarOpen}
        setIsSearchbarOpen={setIsSearchbarOpen}
      />
      <AnimatePresence initial={false}>
        {isShow && (
          <motion.ul
            key="dropdown"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.4 }}
            className="fixed top-14 z-50 flex w-full flex-col gap-2 bg-black px-4 py-4 font-medium text-white transition-all duration-300 ease-in min-[500px]:px-8 min-[600px]:text-xl small:hidden"
          >
            <li
              className="hover:cursor-pointer"
              onClick={() => {
                handleToggleIsShow();
                handleChangeMedia('movie');
                navigate('/');
              }}
            >
              Home
            </li>
            <li
              className="hover:cursor-pointer"
              onClick={() => {
                handleToggleIsShow();
                handleChangeMedia('tv');
                navigate('/');
              }}
            >
              TV Shows
            </li>
            <li
              className="hover:cursor-pointer"
              onClick={() => {
                handleToggleIsShow();
                handleChangeMedia('movie');
                navigate('/');
              }}
            >
              Movies
            </li>
            <li className="hover:cursor-pointer">New</li>
            <li className="hover:cursor-pointer">My List</li>
          </motion.ul>
        )}
      </AnimatePresence>
      {/* {searchResults && !isLoading ? ( */}
      <div
      // className={`absolute left-0 right-0 rounded-xl small:left-[12.5%] small:right-[12.5%] ${isSearchbarOpen ? 'top-12' : 'top-[58px]'} z-[600000000000] mb-10 flex flex-col items-center overflow-y-auto bg-[rgb(31,31,31)] text-white small:top-24`}
      >
        {!isLoading ? (
          <>
            <SearchResults
              searchResults={searchResults}
              isSearchbarOpen={isSearchbarOpen}
              setIsSearchbarOpen={setIsSearchbarOpen}
              debouncedQuery={debouncedQuery}
              isLoading={isLoading}
              setSearchTerm={setSearchTerm}
            />
            {/* {isSearchbarOpen && searchResults.length > 0 && (
              <Overlay setIsSearchbarOpen={setIsSearchbarOpen} />
            )} */}
          </>
        ) : (
          // </div>
          // absolute left-0 right-0 h-48 bg-black
          <div
            className={`${isSearchbarOpen ? 'top-12' : 'top-[58px]'} absolute left-0 right-0 z-[600000000000] mb-10 flex h-48 flex-col items-center overflow-y-auto rounded-xl bg-[rgb(31,31,31)] text-white small:left-[12.5%] small:right-[12.5%] small:top-24`}
          >
            <Spinner />
          </div>
        )}
      </div>
      <Outlet /> {/* This will render the matched route component */}
    </div>
    // </>
  );
};

export default MoviesAndTVShowsApp;
