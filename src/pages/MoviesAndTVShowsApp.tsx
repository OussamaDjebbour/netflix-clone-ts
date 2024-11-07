// Layout.js

import { Outlet } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import { AnimatePresence, motion } from 'framer-motion';
import { useIsShowNavbarContext } from '../context/useIsShowNavbarContext';
import { useMediaContext } from '../context/useMediaContext';

const MoviesAndTVShowsApp = () => {
  const { isShow } = useIsShowNavbarContext();
  const { handleChangeMedia } = useMediaContext();

  return (
    <>
      <Navbar />
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
            <li className="hover:cursor-pointer">Home</li>
            <li
              className="hover:cursor-pointer"
              onClick={() => handleChangeMedia('tv')}
            >
              TV Shows
            </li>
            <li
              className="hover:cursor-pointer"
              onClick={() => handleChangeMedia('movie')}
            >
              Movies
            </li>
            <li className="hover:cursor-pointer">New</li>
            <li className="hover:cursor-pointer">My List</li>
          </motion.ul>
        )}
      </AnimatePresence>
      <Outlet /> {/* This will render the matched route component */}
    </>
  );
};

export default MoviesAndTVShowsApp;
