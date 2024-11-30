import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons/faBell';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaContext } from '../../context/useMediaContext';
import { useIsShowNavbarContext } from '../../context/useIsShowNavbarContext';
import { useIsImageLoadedContext } from '../../context/useIsImageLoadedContext';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import SearchComponent from './SearchComponent';

interface NavbarProps {
  // isSearchbarOpen: boolean;
  // setIsSearchbarOpen: (isSearchbarOpen: boolean) => void;
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

  // const [isSearchbarOpen, setIsSearchbarOpen] = useState(false);

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
    // <nav
    //   className={`bottom-20 top-0 ${isSearchbarOpen ? 'relative max-[680px]:h-9' : 'fixed h-[58px] transition-all duration-500 ease-linear'} z-50 flex w-full items-center gap-8 px-4 transition-all duration-500 ease-in min-[500px]:px-8 md:px-12 lg:gap-12 ${isScrolled ? 'small:bg-black' : 'small:bg-transparent'} `}
    //   // style={{ position: 'fixed' }}

    //   // className={`fixed top-0 z-50 flex h-[58px] w-full items-center gap-8 bg-black px-4 py-4 transition-all duration-500 ease-in min-[500px]:px-8 md:px-12 lg:gap-12 ${isScrolled ? 'small:bg-black' : 'small:bg-transparent'} `}
    // >

    <nav
      // className={`bottom-20 top-0 bg-black ${isSearchbarOpen ? 'relative max-[680px]:h-9' : 'fixed h-[58px] transition-all duration-500 ease-linear'} z-50 flex w-full items-center gap-8 px-4 transition-all duration-500 ease-in min-[500px]:px-8 md:px-12 lg:gap-12 ${isScrolled ? 'small:bg-black' : 'small:bg-transparent'} `}
      // className={`bottom-20 top-0 h-[58px] bg-black ${
      //   isSearchbarOpen
      //     ? 'max-[680px]:relative max-[680px]:h-9'
      //     : 'fixed h-[58px]'
      // } z-50 flex w-full items-center gap-8 px-4 transition-all duration-500 ease-in min-[500px]:px-8 md:px-12 lg:gap-12 ${isScrolled ? 'small:bg-black' : 'small:bg-transparent'} `}

      // className={`bottom-20 top-0 ${isSearchbarOpen ? 'max-[680px]:relative max-[680px]:h-9' : 'fixed h-[58px] transition-all duration-500 ease-linear'} z-50 flex w-full items-center gap-8 px-4 transition-all duration-500 ease-in min-[500px]:px-8 md:px-12 lg:gap-12 ${isScrolled ? 'small:bg-black' : 'small:bg-transparent'} `}

      // ${
      //   isSearchbarOpen
      //     ? 'relative h-9 max-[680px]:block'
      //     : 'fixed h-[58px] transition-all duration-500 ease-linear'
      // }
      // ${
      //   isSearchbarOpen ? 'max-[680px]:h-9' : 'h-[58px]'
      // }
      className={`fixed h-[58px] ${
        isSearchbarOpen && 'max-[680px]:h-9'
      } top-0 z-[10000] flex w-full items-center gap-8 bg-black px-4 transition-all duration-500 ease-in min-[500px]:px-8 md:px-12 lg:gap-12 ${isScrolled ? 'small:bg-black' : 'small:bg-transparent'}`}
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
              handleChangeMedia('movie');
              navigate('/');
            }}
          >
            Home
          </li>
          <li
            className="hover:cursor-pointer"
            onClick={() => {
              handleChangeMedia('movie');
              navigate('/');
            }}
          >
            Movies
          </li>
          <li
            className="hover:cursor-pointer"
            onClick={() => {
              if (mediaType !== 'tv') {
                handleChangeIsImageLoaded(false);
                handleChangeMedia('tv');
                navigate('/');
              } else {
                handleChangeMedia('tv');
                navigate('/');
              }
            }}
          >
            TV Shows
          </li>
          <li className="hover:cursor-pointer">New</li>
          <li className="hover:cursor-pointer">My List</li>
        </motion.ul>
      </AnimatePresence>

      {/* <div className="flex items-center"> */}

      {/* <div className="small:ml-auto small:flex small:items-center"> */}
      {/* <div className="relative"> */}
      {/* <div className=""> */}
      <SearchBar
        isSearchbarOpen={isSearchbarOpen}
        setIsSearchbarOpen={setIsSearchbarOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {/* </div> */}
      {/* </div> */}
      {/* <SearchComponent /> */}
      {/* <FontAwesomeIcon
          icon={faMagnifyingGlass}
          color="white"
          size="lg"
          className="mx-6"
        /> */}

      {/* <FontAwesomeIcon
          className="hidden small:block"
          icon={faBell}
          color="white"
          size="lg"
        /> */}

      <div
        onClick={handleToggleIsShow}
        className={`absolute right-10 flex cursor-pointer items-center transition-all duration-300 small:hidden md:right-20`}
        // className="ml-auto mr-8 flex cursor-pointer items-center small:hidden"
      >
        <FontAwesomeIcon icon={faBars} color="white" size="lg" />
      </div>
      {/* </div> */}

      {/* <div
        onClick={handleToggleIsShow}
        className="ml-auto mr-8 flex cursor-pointer items-center small:hidden"
      >
        <FontAwesomeIcon icon={faBars} color="white" size="lg" />
      </div> */}
    </nav>
  );
};

export default Navbar;
