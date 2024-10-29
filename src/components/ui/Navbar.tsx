import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons/faBell';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaContext } from '../../context/useMediaContext';

interface NavbarProps {
  setIsShow: Dispatch<SetStateAction<boolean>>;
  setImageLoaded: Dispatch<SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ setIsShow, setImageLoaded }) => {
  const [isScrolled, setIsScrolled] = useState(false);

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

  const { handleChangeMedia } = useMediaContext();

  return (
    <nav
      className={`fixed top-0 z-50 flex h-[58px] w-full items-center gap-8 bg-black px-4 py-4 transition-all duration-500 ease-in min-[500px]:px-8 md:px-12 lg:gap-12 ${isScrolled ? 'small:bg-black' : 'small:bg-transparent'} `}
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
          <li className="hover:cursor-pointer">Home</li>
          <li
            className="hover:cursor-pointer"
            onClick={() => handleChangeMedia('movies')}
          >
            Movies
          </li>
          <li
            className="hover:cursor-pointer"
            onClick={() => {
              setImageLoaded(false);
              handleChangeMedia('tvShows');
            }}
          >
            TV Shows
          </li>
          {/* <li
            className="hover:cursor-pointer"
            // onClick={() => handleChangeMedia('anime')}
          >
            Anime
          </li> */}
          <li className="hover:cursor-pointer">New</li>
          <li className="hover:cursor-pointer">My List</li>
        </motion.ul>
      </AnimatePresence>

      <div className="hidden small:ml-auto small:flex small:items-center">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          color="white"
          size="lg"
          className="mx-6"
        />
        <FontAwesomeIcon icon={faBell} color="white" size="lg" />
      </div>

      <div
        onClick={() => setIsShow((isShow) => !isShow)}
        className="ml-auto mr-8 flex cursor-pointer items-center small:hidden"
      >
        <FontAwesomeIcon icon={faBars} color="white" size="lg" />
      </div>
    </nav>
  );
};

export default Navbar;
