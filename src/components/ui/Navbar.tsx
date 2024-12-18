import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaContext } from '../../context/useMediaContext';
import { useIsShowNavbarContext } from '../../context/useIsShowNavbarContext';
import { useIsImageLoadedContext } from '../../context/useIsImageLoadedContext';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { MEDIA_TYPES } from '../../constants';
import { MediaType } from '../../types/tmdb';

interface NavbarProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  isSearchbarOpen: boolean;
  setIsSearchbarOpen: (isSearchOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  searchTerm,
  setSearchTerm,
  isSearchbarOpen,
  setIsSearchbarOpen,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { mediaType, handleChangeMedia } = useMediaContext();
  const { handleToggleIsShow } = useIsShowNavbarContext();
  const { handleChangeIsImageLoaded } = useIsImageLoadedContext();
  const navigate = useNavigate();

  const handleClick = (mediaType: MediaType) => {
    handleChangeMedia(mediaType);
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed h-[58px] ${
        isSearchbarOpen && 'max-[680px]:h-9'
      } top-0 z-[1000000000000000] flex w-full items-center gap-8 bg-black px-4 transition-all duration-500 ease-in min-[500px]:px-8 md:px-12 lg:gap-12 ${isScrolled ? 'small:bg-black' : 'small:bg-transparent'}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <img
        src="../../../src/assets/images/netflix-logo-0.png"
        alt="logo"
        className="w-28"
      />

      <AnimatePresence>
        <motion.ul
          key="content"
          initial={{ x: 300, opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: -300, opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="hidden text-white small:flex small:items-center small:gap-4 small:transition-all small:duration-500 small:ease-in lg:gap-5"
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
              handleClick(MEDIA_TYPES.MOVIE);
            }}
          >
            Movies
          </li>
          <li
            className="hover:cursor-pointer"
            onClick={() => {
              if (mediaType !== MEDIA_TYPES.TV) {
                handleChangeIsImageLoaded(false);
                handleClick(MEDIA_TYPES.TV);
              } else {
                handleClick(MEDIA_TYPES.TV);
              }
            }}
          >
            TV Shows
          </li>
          <li className="hover:cursor-pointer">New</li>
          <li className="hover:cursor-pointer">My List</li>
        </motion.ul>
      </AnimatePresence>

      <SearchBar
        isSearchbarOpen={isSearchbarOpen}
        setIsSearchbarOpen={setIsSearchbarOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div
        onClick={handleToggleIsShow}
        className={`absolute right-10 flex cursor-pointer items-center transition-all duration-300 small:hidden md:right-20`}
      >
        <FontAwesomeIcon
          icon={faBars}
          color="white"
          size="lg"
          aria-label="Open navigation menu" // Descriptive label
          role="button" // Defines it as an interactive element
          tabIndex={0} // Makes it focusable for keyboard users
        />
      </div>
    </nav>
  );
};

export default Navbar;
