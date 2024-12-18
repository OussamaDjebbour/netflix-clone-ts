import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import { AnimatePresence, motion } from 'framer-motion';
import { useIsShowNavbarContext } from '../context/useIsShowNavbarContext';
import { useMediaContext } from '../context/useMediaContext';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MediaType, SearchResult } from '../types/tmdb';
import { searchMoviesAndTv } from '../services/searchMoviesAndTv';
import SearchResults from '../components/ui/SearchResults';
import useDebounce from '../hooks/useDebounce';
import Spinner from '../components/ui/Spinner';
import { MEDIA_TYPES } from '../constants';

const MoviesAndTVShowsApp = () => {
  const { isShow, handleToggleIsShow } = useIsShowNavbarContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchbarOpen, setIsSearchbarOpen] = useState(false);

  const { handleChangeMedia } = useMediaContext();
  const navigate = useNavigate();
  const debouncedQuery = useDebounce(searchTerm, 400); // Debounce delay of 400ms

  const handleClick = (mediaType: MediaType) => {
    handleToggleIsShow();
    handleChangeMedia(mediaType);
    navigate('/');
  };

  const {
    data: searchResults,
    isLoading,
    isError,
  } = useQuery<SearchResult[]>({
    queryKey: ['searchMoviesAndTVShows', debouncedQuery],
    queryFn: () => searchMoviesAndTv(debouncedQuery),
    enabled: debouncedQuery.trim().length > 2, // Disable the query when debouncedQuery length is less than or equal to 2
  });

  if (isError) {
    return (
      <div className="text-center text-red-500">
        An error occurred. Please try again.
      </div>
    );
  }

  return (
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
                handleClick(MEDIA_TYPES.MOVIE);
              }}
            >
              Home
            </li>
            <li
              className="hover:cursor-pointer"
              onClick={() => {
                handleClick(MEDIA_TYPES.TV);
              }}
            >
              TV Shows
            </li>
            <li
              className="hover:cursor-pointer"
              onClick={() => {
                handleClick(MEDIA_TYPES.MOVIE);
              }}
            >
              Movies
            </li>
            <li className="hover:cursor-pointer">New</li>
            <li className="hover:cursor-pointer">My List</li>
          </motion.ul>
        )}
      </AnimatePresence>
      <div>
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
          </>
        ) : (
          <div
            className={`${isSearchbarOpen ? 'top-12' : 'top-[58px]'} absolute left-0 right-0 z-[600000000000] mb-10 flex h-48 flex-col items-center overflow-y-auto rounded-xl bg-[rgb(31,31,31)] text-white small:left-[12.5%] small:right-[12.5%] small:top-24`}
          >
            <Spinner />
          </div>
        )}
      </div>
      <Outlet /> {/* This will render the matched route component */}
    </div>
  );
};

export default MoviesAndTVShowsApp;
